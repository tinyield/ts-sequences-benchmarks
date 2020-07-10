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
