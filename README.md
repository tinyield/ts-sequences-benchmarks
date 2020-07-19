# Glossary
1. [Overview](#overview)
2. [Usage](#usage)
3. [Benchmarks Overview](#benchmarks-overview)
    1. [All Match](#all-match)
    2. [Every](#every)
    3. [Find](#find)
    4. [First](#find-first)
    5. [Zip](#zip)
    6. [Distinct Top Artist and Top Track by Country Benchmark](#distinct-top-artist-and-top-track-by-country-benchmark)
    7. [Artists who are in a Country's top ten who also have Tracks in the same Country's top ten Benchmark](#artists-who-are-in-a-countrys-top-ten-who-also-have-tracks-in-the-same-countrys-top-ten-benchmark)
    8. [Flatmap and Reduce](#flatmap-and-reduce)
    9. [Temperature Transitions](#temperature-transitions)
4. [Performance Comparison](#performance-comparison)
6. [More](#more)

# Overview
In this document you'll find information on how to use the project 
in terms of how to run it in your local machine, a brief description
of each benchmark's pipeline.

# Usage
To run these benchmarks on you local machine just run:
```
npm run build
```
And then:
```
node ./build/lib/index.js
```

For more information run:
```ignorelang
node ./build/lib/index.js -h
```
# Benchmarks Overview
### All Match - `allMatch(sequence, predicate)`
Benchmarks the `allMatch()` operation in the different sequence types.

Collection Sizes: [1000, 100 000]

Pipeline:
```ignorelang
sequenceOfEvenNumbers -> allMatch(isEven)
```
### Every - `every(sequence1, sequence2, predicate)`
Every is an operation that, based on a user defined predicate, tests if all the
elements of a sequence match between corresponding positions. So for instance, if we have:
```javascript
const seq1 = ["505", "Amsterdam", "Mural"];
const seq2 = ["505", "Amsterdam", "Mural"];
const seq3 = ["Mural", "Amsterdam", "505"];
const pred = (s1, s2) => s1.equals(s2);
```
Then:
```javascript
every(seq1, seq2, pred); // returns true
every(seq1, seq3, pred); // returns false
```
For `every` to return true, every element of each sequence must match in the same index.
The `every` feature can be achieved through a pipeline of `zip`-`allMatch` operations,
such as:
```javascript
seq1.zip(seq2, pred).allMatch(isTrue);
```

Benchmarked for: [Class, Number, String]  
Collection Sizes: [1000, 100 000]

Pipeline:
```ignorelang
sourceSequence + copyOfSourceSequence -> zip(equals) -> allMatch(isTrue)
```
### Find - `find(sequence1, sequence2, predicate)`
The `find` between two sequences is an operation that, based on a user defined
predicate, finds two elements that match, returning one of them in the process.
So if we have:
```javascript
const seq1 = ["505", "Amsterdam", "Mural"];
const seq2 = ["400", "Amsterdam", "Stricken"];
const seq3 = ["Amsterdam", "505", "Stricken"];
const predicate = (s1, s2) => s1.equals(s2);
```
Then:
```java
find(seq1, seq2, predicate); // returns "Amsterdam"
find(seq1, seq3, predicate); // returns null
find(seq2, seq3, predicate); // returns "Stricken"
```
For `find` to return an element, two elements of each sequence must match in the
same index. Here's what an implementation of `find` would look like with the support 
of a `zip`:
```javascript
zip(seq1, seq2, (t1, t2) => predicate(t1, t2) ? t1 : null)
    .filter(isNotNull)
    .first();
}
```

Benchmarked for: [Class, Number, String]  
Collection Sizes: [1000, 100 000]  
This pipeline has two ways of determining which element will be the matching element:
1. For String sequences, the matching element will be on a fixed index, using the 
following criteria:
    * For collections with more than 100 elements, the matching index will correspond
     to COLLECTION_SIZE / 100.  
      (e.g: for a COLLECTION_SIZE of 100K the pipeline will match with the 1000th element)
      
    * Otherwise, the matching index will correspond to COLLECTION_SIZE / 10.  
    (e.g: for a COLLECTION_SIZE of 100 elements the pipeline will match with the 10th element)
2. For all sequences (including String), the match index increments with each iteration
to make sure there are matches in every index of the sequence.  
(e.g: On the 1st iteration the match index will be 0, on the 2nd it will be 1, etc... )

Pipeline:
```javascript
sourceSequence1 + sourceSequence2 -> 
-> zip((e1, e2) => predicate(e1, e2) ? t1 : null) -> 
-> filter(isNotNull) ->
-> first() 
```
### First - `first(sequence, predicate)`
Benchmarks the usage of the `findFirst()` operator. This benchmark was run 
with three types of Sequences:
1. One where the match would be found in the first element.
1. One where the match would be found in the middle.
1. One where the match would be found in the last element.

Collection Sizes: [1000, 100 000]

Pipeline:
```ignorelang
sequenceOfAllButOneEvenNumbers -> filter(isOdd) -> findFirst()
```
### Zip Primes with Values - `zip(primes, values)`
Benchmarks _zipping_ a sequence of prime Numbers with instances of the class Value.

Collection Sizes: [1000, 100 000]

Pipeline:
```ignorelang
(sequenceOfNumbers -> filter(isPrime)) + sequenceOfValues -> zip(Pair.with) -> forEach(blackhole)
```
### Distinct Top Artist and Top Track by Country Benchmark - `zip(artists, tracks)`
Benchmarks creating two different sequences, one consisting of the top 50 Artists 
(provided by [Last.fm](https://www.last.fm/api/)) of each non english speaking 
country (provided by [REST Countries](https://restcountries.eu/)) and the other
the exact same thing but for the top 50 Tracks.
Then _zipping_ both sequences into a Trio of Country, First Artist and First Track and
retrieving the distinct elements by Artist.

Pipelines:
* Sequence of Artists:
```ignorelang
sequenceOfCountries -> filter(isNonEnglishSpeaking) -> filter(hasArtists) -> map(Pair.of(country, artists));
```

* Sequence of Tracks:
```ignorelang
sequenceOfCountries -> filter(isNonEnglishSpeaking) -> filter(hasTracks) -> map(Pair.of(country, tracks));
```
* Pipeline
```ignorelang
sequenceOfArtists + sequenceOfTracks -> 
-> zip(Trio.of(country, topArtist, topTrack)) -> 
-> distinctBy(artist) -> 
-> forEach(blackhole)
```
### Artists who are in a Country's top ten who also have Tracks in the same Country's top ten Benchmark - `zip(artists, tracks)`
Benchmarks creating two different sequences, one consisting of the top 50 Artists 
(provided by [Last.fm](https://www.last.fm/api/)) of each non english speaking 
country (provided by [REST Countries](https://restcountries.eu/)) and the other
the exact same thing but for the top 50 Tracks.
Then, for each Country, we take the top ten Artists and top ten Track artist's 
names and zip them into a Trio. After, the top ten artists are filtered by their 
presence in the top ten Track artist's name, returning a Pair with the Country 
and the resulting Sequence.

Pipelines:
* Sequence of Artists:
```ignorelang
sequenceOfCountries -> filter(isNonEnglishSpeaking) -> filter(hasArtists) -> map(Pair.of(country, artists));
```

* Sequence of Tracks:
```ignorelang
sequenceOfCountries -> filter(isNonEnglishSpeaking) -> filter(hasTracks) -> map(Pair.of(country, tracks));
```
* Pipeline
```ignorelang
sequenceOfArtists + sequenceOfTracks -> 
-> zip(Trio.of(country, artists, tracks)) -> 
-> map(Pair.of(country, artists)) -> 
-> forEach(blackhole)
```

### Flatmap and Reduce - `flatmapAndReduce(nestedSequence)`
Benchmarks the usage of the flatmap operation terminating with a reduce operation. In this case in
particular we use a nested sequence of numbers flatmap it to a regular sequence of numbers and then sum
them.

Pipeline:
```ignorelang
nestedSequence -> flatmap() -> reduce()
```

### Temperature Transitions - `collapse(sequence)`
This benchmarks the usage of a user defined operation, for this benchmark we used real data gathered from
the [World Weather Online API](https://developer.worldweatheronline.com/api/). The data is in .csv which
means it needs to be prepared, in order to do so we have two user defined operations "oddLines" which
filters any line in an odd index, and "collapse" that filters equal elements in sequence to each other
(e.g. input: 3, 5, 5, 3, 5 -> output: 3,5,3,5 ) 

Pipeline:
```ignorelang
lineSequence -> 
-> filter("#") ->
-> skip(No Data Lines) -> 
-> oddLines -> 
-> map(toTemperature) -> 
-> collapse() -> 
-> count()
```

# Performance Comparison
The results presented here were based on the results attained from Github Actions,
they are presented in relation to IxJs's IterableX performance, due to it being the closest
to Javascript's out of the box lazy sequence which is the Iterable. For the actual results
check the [Github Actions Section](https://github.com/tinyield/ts-sequences-benchmarks/actions).

**Notes:**
* IxJs's IterableX performance is equivalent to 1, all results are presented in relation to it
* For Pipelines where collection sizes vary, only 1k results and 100k results will be
displayed, separated in a pipe format, like so:
  * 1K results&nbsp;|&nbsp;100K results

### Benchmarks with one Sequence
<table>
    <thead>
        <tr>
            <th>Benchmark</th>
            <th>Time&nbsp;Complexity</th>
            <comment></comment>
            <th>Underscore</th>
            <th>Tinyield</th>
            <th>Sequency</th>
            <th>Lodash</th>
            <th>Lazy.js</th>
        </tr>
    </thead>
    <tbody>
         <tr>
            <td class="Benchmark">All&nbsp;match</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">6.51&nbsp;|&nbsp;3.57</td>
            <td class="Tinyield">4.11&nbsp;|&nbsp;2.70</td>
            <td class="Sequency">2.42&nbsp;|&nbsp;2.23</td>
            <td class="Lodash">6.23&nbsp;|&nbsp;3.60</td>
            <td class="Lazy.js">6.96&nbsp;|&nbsp;3.57</td>
        </tr>
        <tr>
            <td class="Benchmark">First&nbsp;in&nbsp;Beginning</td>
            <td class="TimeComplexity">Constant</td>
            <comment></comment>
            <td class="Underscore">0.41&nbsp;|&nbsp;1.51</td>
            <td class="Tinyield">1.71&nbsp;|&nbsp;1.98</td>
            <td class="Sequency">1.43&nbsp;|&nbsp;1.98</td>
            <td class="Lodash">0.31&nbsp;|&nbsp;1.36</td>
            <td class="Lazy.js">1.54&nbsp;|&nbsp;1.96</td>
        </tr>
        <tr>
            <td class="Benchmark">First&nbsp;in&nbsp;Middle</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">2.19&nbsp;|&nbsp;2.40</td>
            <td class="Tinyield">4.41&nbsp;|&nbsp;2.43</td>
            <td class="Sequency">2.98&nbsp;|&nbsp;2.25</td>
            <td class="Lodash">1.51&nbsp;|&nbsp;2.11</td>
            <td class="Lazy.js">6.95&nbsp;|&nbsp;3.05</td>   
        </tr>
        <tr>
            <td class="Benchmark">First&nbsp;in&nbsp;End</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">3.39&nbsp;|&nbsp;2.93</td>
            <td class="Tinyield">4.42&nbsp;|&nbsp;2.72</td>
            <td class="Sequency">2.55&nbsp;|&nbsp;2.27</td>
            <td class="Lodash">2.54&nbsp;|&nbsp;2.60</td>
            <td class="Lazy.js">8.35&nbsp;|&nbsp;3.40</td>  
        </tr>
        <tr>
            <td class="Benchmark">Flatmap&nbsp;and&nbsp;Reduce</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">1.52&nbsp;|&nbsp;0.66</td>
            <td class="Tinyield">2.47&nbsp;|&nbsp;3.62</td>
            <td class="Sequency">2.98&nbsp;|&nbsp;2.92</td>
            <td class="Lodash">2.22&nbsp;|&nbsp;0.60</td>
            <td class="Lazy.js">5.03&nbsp;|&nbsp;6.17</td>
        </tr>
        <tr>
            <td class="Benchmark">Temperature&nbsp;Transitions</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">5.24</td>
            <td class="Tinyield">5.74</td>
            <td class="Sequency">2.61</td>
            <td class="Lodash">4.48</td>
            <td class="Lazy.js">5.86</td>
            <td class="IxJs">1.00</td>
        </tr>
    </tbody>
</table>

### Benchmarks with two Sequences
<table>
    <thead>
        <tr>
            <th>Benchmark</th>
            <th>Time&nbsp;Complexity</th>
            <comment></comment>
            <th>Underscore</th>
            <th>Tinyield</th>
            <th>Sequency</th>
            <th>Lodash</th>
            <th>Lazy.js</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="Benchmark">Every&nbsp;String</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">1.60&nbsp;|&nbsp;0.49</td>
            <td class="Tinyield">4.47&nbsp;|&nbsp;2.05</td>
            <td class="Sequency">3.17&nbsp;|&nbsp;1.83</td>
            <td class="Lodash">3.17&nbsp;|&nbsp;0.70</td>
            <td class="Lazy.js">3.44&nbsp;|&nbsp;2.09</td>        
        </tr>
        <tr>
            <td class="Benchmark">Every&nbsp;Number</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">1.48&nbsp;|&nbsp;0.40</td>
            <td class="Tinyield">4.40&nbsp;|&nbsp;3.24</td>
            <td class="Sequency">3.21&nbsp;|&nbsp;2.64</td>
            <td class="Lodash">3.53&nbsp;|&nbsp;0.67</td>
            <td class="Lazy.js">3.87&nbsp;|&nbsp;3.17</td>
        </tr>
        <tr>
            <td class="Benchmark">Every&nbsp;Class</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">1.44&nbsp;|&nbsp;0.41</td>
            <td class="Tinyield">4.15&nbsp;|&nbsp;3.07</td>
            <td class="Sequency">3.25&nbsp;|&nbsp;2.55</td>
            <td class="Lodash">3.47&nbsp;|&nbsp;0.69</td>
            <td class="Lazy.js">3.65&nbsp;|&nbsp;3.05</td>    
        </tr>
        <tr>
            <td class="Benchmark">Zip&nbsp;Primes&nbsp;with&nbsp;Values</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">0.64&nbsp;|&nbsp;0.27</td>
            <td class="Tinyield">3.27&nbsp;|&nbsp;1.89</td>
            <td class="Sequency">2.68&nbsp;|&nbsp;1.75</td>
            <td class="Lodash">0.95&nbsp;|&nbsp;0.29</td>
            <td class="Lazy.js">3.00&nbsp;|&nbsp;2.06</td>
        </tr>
        <tr>
            <td class="Benchmark">Zip&nbsp;Top&nbsp;Artist&nbsp;&&nbsp;Track(1)</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">0.69</td>
            <td class="Tinyield">1.59</td>
            <td class="Sequency">2.13</td>
            <td class="Lodash">0.42</td>
            <td class="Lazy.js">2.13</td>
        </tr>
        <tr>
            <td class="Benchmark">Zip&nbsp;Artists&nbsp;in&nbsp;Top10(2)</td>
            <td class="TimeComplexity">Linear</td>
            <comment></comment>
            <td class="Underscore">1.12</td>
            <td class="Tinyield">1.90</td>
            <td class="Sequency">1.55</td>
            <td class="Lodash">0.67</td>
            <td class="Lazy.js">2.70</td>
        </tr>
    </tbody>
</table>

(1) Corresponds to "Distinct Top Artist and Top Track by Country Benchmark"  <br>
(2) Corresponds to Artists who are in a Country's top ten who also have Tracks" 
in the same Country's top ten Benchmark

# More
If you're interested in a similar comparison but in the Java world head over to our other 
[Benchmarks Github Repository](https://github.com/tinyield/sequences-benchmarks). You can
also check a more in depth analysis in an [Article we wrote over at 
DZONE](https://dzone.com/articles/bridge-the-gap-of-zip-operation).
