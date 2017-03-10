'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
// based on: http://en.wikibooks.org/wiki/Algorithm_implementation/Strings/Levenshtein_distance
// and:  http://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
/**
 * Distance of strings algorithm
 * @module fsdevstart.utils.damerauLevenshtein
 */
/**
 * a function calculating distance between two strings
 * according to the damerau Levenshtein algorithm
 * (this algorithm, in contrast to plain levenshtein treats
 * swapping of characters a distance 1  "word"  <-> "wrod )
 * @param {string} a
 * @param {string} b
 * @public
 */
/*
export function levenshteinDamerau (a : string, b : string) {
  var i : number
  var j : number
  var cost : number
  var d = []
  if (a.length === 0) {
    return b.length
  }
  if (b.length === 0) {
    return a.length
  }
  for (i = 0; i <= a.length; i++) {
    d[ i ] = []
    d[ i ][ 0 ] = i
  }
  for (j = 0; j <= b.length; j++) {
    d[ 0 ][ j ] = j
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        cost = 0
      } else {
        cost = 1
      }

      d[ i ][ j ] = Math.min(d[ i - 1 ][ j ] + 1, d[ i ][ j - 1 ] + 1, d[ i - 1 ][ j - 1 ] + cost)

      if (

        i > 1 &&

        j > 1 &&

        a.charAt(i - 1) === b.charAt(j - 2) &&

        a.charAt(i - 2) === b.charAt(j - 1)

      ) {
        d[i][j] = Math.min(

          d[i][j],

          d[i - 2][j - 2] + cost

        )
      }
    }
  }

  return d[ a.length ][ b.length ]
}
*/
/*
export function levenshtein (a : string, b : string) {
  //return 2.0 * sift3Distance(a,b); //,6,7); // + b.length / 2);
  return levenshteinDamerau(a,b);
}
*/
/*

export function sift3Distance(s1, s2) {
    if (s1 == null || s1.length === 0) {
        if (s2 == null || s2.length === 0) {
            return 0;
        } else {
            return s2.length;
        }
    }

    if (s2 == null || s2.length === 0) {
        return s1.length;
    }
    if (Math.abs(s1.length  - s2.length) > 20) {
      return  Math.max(s1.length, s2.length)/2;
    }

    var c = 0;
    var offset1 = 0;
    var offset2 = 0;
    var lcs = 0;
    var maxOffset = 3;

    while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
        if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) {
            lcs++;
        } else {
            offset1 = 0;
            offset2 = 0;
            for (var i = 0; i < maxOffset; i++) {
                if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))) {
                    offset1 = i;
                    break;
                }
                if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))) {
                    offset2 = i;
                    break;
                }
            }
        }
        c++;
    }
    return (s1.length + s2.length) / 2 - lcs;
}
*/
/*
//  Sift4 - common version
// https://siderite.blogspot.com/2014/11/super-fast-and-accurate-string-distance.html
// online algorithm to compute the distance between two strings in O(n)
// maxOffset is the number of characters to search for matching letters
// maxDistance is the distance at which the algorithm should stop computing the value and just exit (the strings are too different anyway)
export function sift4(s1, s2, maxOffset, maxDistance) {
    if (!s1||!s1.length) {
        if (!s2) {
            return 0;
        }
        return s2.length;
    }

    if (!s2||!s2.length) {
        return s1.length;
    }

    var l1=s1.length;
    var l2=s2.length;
    if(Math.abs(l1 - l2) > maxDistance) {
      return 50000;
    }

    var c1 = 0;  //cursor for string 1
    var c2 = 0;  //cursor for string 2
    var lcss = 0;  //largest common subsequence
    var local_cs = 0; //local common substring
    var trans = 0;  //number of transpositions ('ab' vs 'ba')
    var offset_arr=[];  //offset pair array, for computing the transpositions

    while ((c1 < l1) && (c2 < l2)) {
        if (s1.charAt(c1) == s2.charAt(c2)) {
            local_cs++;
            var isTrans=false;
            //see if current match is a transposition
            var i=0;
            while (i<offset_arr.length) {
                var ofs=offset_arr[i];
                if (c1<=ofs.c1 || c2 <= ofs.c2) {
                    // when two matches cross, the one considered a transposition is the one with the largest difference in offsets
                    isTrans=Math.abs(c2-c1)>=Math.abs(ofs.c2-ofs.c1);
                    if (isTrans)
                    {
                        trans++;
                    } else
                    {
                        if (!ofs.trans) {
                            ofs.trans=true;
                            trans++;
                        }
                    }
                    break;
                } else {
                    if (c1>ofs.c2 && c2>ofs.c1) {
                        offset_arr.splice(i,1);
                    } else {
                        i++;
                    }
                }
            }
            offset_arr.push({
                c1:c1,
                c2:c2,
                trans:isTrans
            });
        } else {
            lcss+=local_cs;
            local_cs=0;
            if (c1!=c2) {
                c1=c2=Math.min(c1,c2);  //using min allows the computation of transpositions
            }
            //if matching characters are found, remove 1 from both cursors (they get incremented at the end of the loop)
            //so that we can have only one code block handling matches
            for (var i = 0; i < maxOffset && (c1+i<l1 || c2+i<l2); i++) {
                if ((c1 + i < l1) && (s1.charAt(c1 + i) == s2.charAt(c2))) {
                    c1+= i-1;
                    c2--;
                    break;
                }
                if ((c2 + i < l2) && (s1.charAt(c1) == s2.charAt(c2 + i))) {
                    c1--;
                    c2+= i-1;
                    break;
                }
            }
        }
        c1++;
        c2++;
        if (maxDistance)
        {
            var temporaryDistance=Math.max(c1,c2)-lcss+trans;
            if (temporaryDistance>=maxDistance) return 50000; // Math.round(temporaryDistance);
        }
        // this covers the case where the last match is on the last token in list, so that it can compute transpositions correctly
        if ((c1 >= l1) || (c2 >= l2)) {
            lcss+=local_cs;
            local_cs=0;
            c1=c2=Math.min(c1,c2);
        }
    }
    lcss+=local_cs;
    return Math.round(Math.max(l1,l2)- lcss +trans); //add the cost of transpositions to the final result
}

*/
/**
 * Talisman metrics/distance/jaro
 * ===============================
 *
 * Function computing the Jaro score.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
 *
 * [Articles]:
 * Jaro, M. A. (1989). "Advances in record linkage methodology as applied to
 * the 1985 census of Tampa Florida".
 * Journal of the American Statistical Association 84 (406): 414–20
 *
 * Jaro, M. A. (1995). "Probabilistic linkage of large public health data file".
 * Statistics in Medicine 14 (5–7): 491–8.
 *
 * [Tags]: semimetric, string metric.
 */
/**
 * Function creating a vector of n dimensions and filling it with a single
 * value if required.
 *
 * @param  {number} n    - Dimensions of the vector to create.
 * @param  {mixed}  fill - Value to be used to fill the vector.
 * @return {array}       - The resulting vector.
 */
function vec(n, fill) {
    var vector = new Array(n);
    if (arguments.length > 1) {
        for (var i = 0; i < n; i++) {
            vector[i] = fill;
        }
    }
    return vector;
}
exports.vec = vec;
/**
 * Function returning the Jaro score between two sequences.
 *
 * @param  {mixed}  a     - The first sequence.
 * @param  {mixed}  b     - The second sequence.
 * @return {number}       - The Jaro score between a & b.
 */
function talisman_jaro(a, b) {
    // Fast break
    if (a === b) return 1;
    var max, min;
    if (a.length > b.length) {
        max = a;
        min = b;
    } else {
        max = b;
        min = a;
    }
    // Finding matches
    var range = Math.max((max.length / 2 | 0) - 1, 0),
        indexes = vec(min.length, -1),
        flags = vec(max.length, false);
    var matches = 0;
    for (var i = 0, l = min.length; i < l; i++) {
        var character = min[i],
            xi = Math.max(i - range, 0),
            xn = Math.min(i + range + 1, max.length);
        for (var j = xi, m_1 = xn; j < m_1; j++) {
            if (!flags[j] && character === max[j]) {
                indexes[i] = j;
                flags[j] = true;
                matches++;
                break;
            }
        }
    }
    var ms1 = new Array(matches),
        ms2 = new Array(matches);
    var si;
    si = 0;
    for (var i = 0, l = min.length; i < l; i++) {
        if (indexes[i] !== -1) {
            ms1[si] = min[i];
            si++;
        }
    }
    si = 0;
    for (var i = 0, l = max.length; i < l; i++) {
        if (flags[i]) {
            ms2[si] = max[i];
            si++;
        }
    }
    var transpositions = 0;
    for (var i = 0, l = ms1.length; i < l; i++) {
        if (ms1[i] !== ms2[i]) transpositions++;
    }
    // Computing the distance
    if (!matches) return 0;
    var t = transpositions / 2 | 0,
        m = matches;
    return (m / a.length + m / b.length + (m - t) / m) / 3;
}
exports.talisman_jaro = talisman_jaro;
/**
 * Jaro distance is 1 - the Jaro score.
 */
//const distance = (a, b) => 1 - jaro(a, b);
/**
 * Talisman metrics/distance/jaro-winkler
 * =======================================
 *
 * Function computing the Jaro-Winkler score.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
 *
 * [Article]:
 * Winkler, W. E. (1990). "String Comparator Metrics and Enhanced Decision Rules
 * in the Fellegi-Sunter Model of Record Linkage".
 * Proceedings of the Section on Survey Research Methods
 * (American Statistical Association): 354–359.
 *
 * [Tags]: semimetric, string metric.
 */
/**
 * Jaro-Winkler standard function.
 */
//export const jaroWinkler = customJaroWinkler.bind(null, null);
/**
 * Jaro-Winkler distance is 1 - the Jaro-Winkler score.
 */
//const distance = (a, b) => 1 - jaroWinkler(a, b);
/**
 * Exporting.
 */
// Computes the Winkler distance between two string -- intrepreted from:
// http://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
// s1 is the first string to compare
// s2 is the second string to compare
// dj is the Jaro Distance (if you've already computed it), leave blank and the method handles it
function jaroWinklerDistance(s1, s2) {
    if (s1 == s2) {
        return 1;
    } else {
        var jaro = talisman_jaro(s1, s2);
        var p = 0.1; //
        var l = 0; // length of the matching prefix
        while (s1[l] == s2[l] && l < 4) {
            l++;
        }return jaro + l * p * (1 - jaro);
    }
}
exports.jaroWinklerDistance = jaroWinklerDistance;
/*

function cntChars(str : string, len : number) {
  var cnt = 0;
  for(var i = 0; i < len; ++i) {
    cnt += (str.charAt(i) === 'X')? 1 : 0;
  }
  return cnt;
}
*/
/**
 * @param sText {string} the text to match to NavTargetResolution
 * @param sText2 {string} the query text, e.g. NavTarget
 *
 * @return the distance, note that is is *not* symmetric!
 */
function calcDistance(sText1, sText2) {
    // console.log("length2" + sText1 + " - " + sText2)
    var s1len = sText1.length;
    var s2len = sText2.length;
    var min = Math.min(s1len, s2len);
    if (Math.abs(s1len - s2len) > min) {
        return 0.3;
    }
    var dist = jaroWinklerDistance(sText1, sText2);
    /*
    var cnt1 = cntChars(sText1, s1len);
    var cnt2 = cntChars(sText2, s2len);
    if(cnt1 !== cnt2) {
      dist = dist * 0.7;
    }
    */
    return dist;
    /*
    var a0 = distance.levenshtein(sText1.substring(0, sText2.length), sText2)
    if(debuglogV.enabled) {
      debuglogV("distance" + a0 + "stripped>" + sText1.substring(0,sText2.length) + "<>" + sText2+ "<");
    }
    if(a0 * 50 > 15 * sText2.length) {
        return 40000;
    }
    var a = distance.levenshtein(sText1, sText2)
    return a0 * 500 / sText2.length + a
    */
}
exports.calcDistance = calcDistance;
/*
var facAdjustDistance = [];
var u = "a";
for(var i = 2; i < 15; ++i) {
  var un = u + String.fromCharCode('A'.charCodeAt(0) + i + 1 );
  console.log(un);
  facAdjustDistance[u.length] = (1-0.9801000)/ (1.0 - calcDistance(u,un));
  u = un;
}

export function calcDistanceAdjusted2(a: string, b:string) : number {
  var dist = calcDistance(a,b);
  var ml = Math.min(a.length, b.length);
  if(dist < 1.0 && (ml < 15) &&  (ml > 2)) {
      return 1.0  -  (1.0- dist) * facAdjustDistance[ml];
  }
  return dist;
}
*/
/**
 * The adjustment is chosen in the following way,
 * a single "added" character at the end of the string fits
 * is "lifted at length 5" to 0.98
 *   1.665 =  ( 1 - calcDistance('abcde','abcde_')) / 0.98
 *
 * The function is smoothly to merge at length 20;
 *   fac =((20-len)/(15))*0.665 +1
 *   res = 1- (1-d)/fac;
 */
function calcDistanceAdjusted(a, b) {
    var dist = calcDistance(a, b);
    var ml = Math.min(a.length, b.length);
    if (dist < 1.0 && ml < 20) {
        var fac = 1 + 0.665 / 15.0 * (20 - ml);
        return 1.0 - (1.0 - dist) / fac;
    }
    return dist;
}
exports.calcDistanceAdjusted = calcDistanceAdjusted;
/*

function getCharAt(str, n) {
  if(str.length > n) {
    return str.charAt(n);
  }
  return '';
}

function getHead(str,u) {
  u = Math.min(str.length, u);
  u = Math.max(0,u);
  return str.substring(0,u);
}

function getTail(str,p) {
  return str.substring(p);
}

var strs = ["A"];
var u = "A";
for(var i = 1; i < 25; ++i) {
  var un = u + String.fromCharCode('A'.charCodeAt(0) + i );
  strs[un.length-1] = un;
  console.log(un);
  facAdjustDistance[u.length] = (1-0.9801000)/ (1.0 - calcDistance(u,un));
  u = un;
}

var res = [];

var res2 = [];
for(var i = 1; i < strs.length; ++i) {
  var str = strs[i];
  var nc = String.fromCharCode('a'.charCodeAt(0) + 2*i + 2 );
  var nc = '_';
  var addTail = str  + nc;
  var addFront = nc + str;
  var nc2 = '/'; //String.fromCharCode('a'.charCodeAt(0) + 2*i + 3 );

  var diffMid = getHead(str,Math.floor(str.length/2))  + nc  + getTail(str, Math.floor(str.length/2)+1);
  var diffMid2 = strs[i].substring(0, Math.floor(str.length/2)-1) + nc + nc2 + getTail(str,Math.floor(str.length/2)+1);
  var diffEnd = strs[i].substring(0, strs[i].length - 1) + nc;
  var diffStart = nc + strs[i].substring(1);
  var swapFront = str.substring(0,2) + getCharAt(str,3) + getCharAt(str,2) + str.substring(4);
  var swapMid = getHead(str, Math.floor(str.length/2)-1)  + getCharAt(str,Math.floor(str.length/2)) + getCharAt(str,Math.floor(str.length/2)-1)  + getTail(str,Math.floor(str.length/2)+1);
  var swapEnd = getHead(str, str.length - 2) + getCharAt(str,str.length-1) + getCharAt(str,str.length-2);

  var r = [diffStart, diffMid, diffEnd, addFront, addTail, diffMid2, swapFront, swapMid, swapEnd ];
  console.log('****\n' + str +'\n' + r.join("\n"));
  if( i === 1) {
    res.push(`i\tdiffStart\tdiffMid\tdiffEnd\taddFront\taddTail\tdiffMid2\tswapFront\tswapMid\tswapEnd\n`);
    res2.push(`i\tdiffStart\tdiffMid\tdiffEnd\taddFront\taddTail\tdiffMid2\tswapFront\tswapMid\tswapEnd\n`);
  }
  res.push(`${str.length}\t` + r.map(s => calcDistance(str,s).toFixed(4)).join("\t") + '\n');
  res2.push(`${str.length}\t` + r.map(s => calcDistanceAdjusted(str,s).toFixed(4)).join("\t") + '\n');
}


console.log(res.join(''));

console.log('---');
console.log(res2.join(''));

var fs = require('fs');
fs.writeFileSync('leven.txt', res.join('') + '\n' + res2.join(''));

*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyIsImluZGV4LmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwidmVjIiwibiIsImZpbGwiLCJ2ZWN0b3IiLCJBcnJheSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImkiLCJ0YWxpc21hbl9qYXJvIiwiYSIsImIiLCJtYXgiLCJtaW4iLCJyYW5nZSIsIk1hdGgiLCJpbmRleGVzIiwiZmxhZ3MiLCJtYXRjaGVzIiwibCIsImNoYXJhY3RlciIsInhpIiwieG4iLCJqIiwibV8xIiwibXMxIiwibXMyIiwic2kiLCJ0cmFuc3Bvc2l0aW9ucyIsInQiLCJtIiwiamFyb1dpbmtsZXJEaXN0YW5jZSIsInMxIiwiczIiLCJqYXJvIiwicCIsImNhbGNEaXN0YW5jZSIsInNUZXh0MSIsInNUZXh0MiIsInMxbGVuIiwiczJsZW4iLCJhYnMiLCJkaXN0IiwiY2FsY0Rpc3RhbmNlQWRqdXN0ZWQiLCJtbCIsImZhYyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQ0FBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEVBQUVDLE9BQU8sSUFBVCxFQUE3QztBRENBO0FBQ0E7QUFHQTs7OztBQUtBOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBOzs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7Ozs7Ozs7QUFRQSxTQUFBQyxHQUFBLENBQW9CQyxDQUFwQixFQUF1QkMsSUFBdkIsRUFBMkI7QUFDekIsUUFBTUMsU0FBUyxJQUFJQyxLQUFKLENBQVVILENBQVYsQ0FBZjtBQUVBLFFBQUlJLFVBQVVDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsYUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLENBQXBCLEVBQXVCTSxHQUF2QjtBQUNFSixtQkFBT0ksQ0FBUCxJQUFZTCxJQUFaO0FBREY7QUFFRDtBQUNELFdBQU9DLE1BQVA7QUFDRDtBQVJETCxRQUFBRSxHQUFBLEdBQUFBLEdBQUE7QUFXQTs7Ozs7OztBQU9BLFNBQUFRLGFBQUEsQ0FBOEJDLENBQTlCLEVBQWlDQyxDQUFqQyxFQUFrQztBQUNoQztBQUNBLFFBQUlELE1BQU1DLENBQVYsRUFDRSxPQUFPLENBQVA7QUFFRixRQUFJQyxHQUFKLEVBQVNDLEdBQVQ7QUFFQSxRQUFJSCxFQUFFSCxNQUFGLEdBQVdJLEVBQUVKLE1BQWpCLEVBQXlCO0FBQ3ZCSyxjQUFNRixDQUFOO0FBQ0FHLGNBQU1GLENBQU47QUFDRCxLQUhELE1BSUs7QUFDSEMsY0FBTUQsQ0FBTjtBQUNBRSxjQUFNSCxDQUFOO0FBQ0Q7QUFFRDtBQUNBLFFBQU1JLFFBQVFDLEtBQUtILEdBQUwsQ0FBUyxDQUFFQSxJQUFJTCxNQUFKLEdBQWEsQ0FBZCxHQUFtQixDQUFwQixJQUF5QixDQUFsQyxFQUFxQyxDQUFyQyxDQUFkO0FBQUEsUUFDTVMsVUFBVWYsSUFBSVksSUFBSU4sTUFBUixFQUFnQixDQUFDLENBQWpCLENBRGhCO0FBQUEsUUFFTVUsUUFBUWhCLElBQUlXLElBQUlMLE1BQVIsRUFBZ0IsS0FBaEIsQ0FGZDtBQUlBLFFBQUlXLFVBQVUsQ0FBZDtBQUVBLFNBQUssSUFBSVYsSUFBSSxDQUFSLEVBQVdXLElBQUlOLElBQUlOLE1BQXhCLEVBQWdDQyxJQUFJVyxDQUFwQyxFQUF1Q1gsR0FBdkMsRUFBNEM7QUFDMUMsWUFBTVksWUFBWVAsSUFBSUwsQ0FBSixDQUFsQjtBQUFBLFlBQ01hLEtBQUtOLEtBQUtILEdBQUwsQ0FBU0osSUFBSU0sS0FBYixFQUFvQixDQUFwQixDQURYO0FBQUEsWUFFTVEsS0FBS1AsS0FBS0YsR0FBTCxDQUFTTCxJQUFJTSxLQUFKLEdBQVksQ0FBckIsRUFBd0JGLElBQUlMLE1BQTVCLENBRlg7QUFJQSxhQUFLLElBQUlnQixJQUFJRixFQUFSLEVBQVlHLE1BQUlGLEVBQXJCLEVBQXlCQyxJQUFJQyxHQUE3QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkMsZ0JBQUksQ0FBQ04sTUFBTU0sQ0FBTixDQUFELElBQWFILGNBQWNSLElBQUlXLENBQUosQ0FBL0IsRUFBdUM7QUFDckNQLHdCQUFRUixDQUFSLElBQWFlLENBQWI7QUFDQU4sc0JBQU1NLENBQU4sSUFBVyxJQUFYO0FBQ0FMO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7QUFFRCxRQUFNTyxNQUFNLElBQUlwQixLQUFKLENBQVVhLE9BQVYsQ0FBWjtBQUFBLFFBQ01RLE1BQU0sSUFBSXJCLEtBQUosQ0FBVWEsT0FBVixDQURaO0FBR0EsUUFBSVMsRUFBSjtBQUVBQSxTQUFLLENBQUw7QUFDQSxTQUFLLElBQUluQixJQUFJLENBQVIsRUFBV1csSUFBSU4sSUFBSU4sTUFBeEIsRUFBZ0NDLElBQUlXLENBQXBDLEVBQXVDWCxHQUF2QyxFQUE0QztBQUMxQyxZQUFJUSxRQUFRUixDQUFSLE1BQWUsQ0FBQyxDQUFwQixFQUF1QjtBQUNyQmlCLGdCQUFJRSxFQUFKLElBQVVkLElBQUlMLENBQUosQ0FBVjtBQUNBbUI7QUFDRDtBQUNGO0FBRURBLFNBQUssQ0FBTDtBQUNBLFNBQUssSUFBSW5CLElBQUksQ0FBUixFQUFXVyxJQUFJUCxJQUFJTCxNQUF4QixFQUFnQ0MsSUFBSVcsQ0FBcEMsRUFBdUNYLEdBQXZDLEVBQTRDO0FBQzFDLFlBQUlTLE1BQU1ULENBQU4sQ0FBSixFQUFjO0FBQ1prQixnQkFBSUMsRUFBSixJQUFVZixJQUFJSixDQUFKLENBQVY7QUFDQW1CO0FBQ0Q7QUFDRjtBQUVELFFBQUlDLGlCQUFpQixDQUFyQjtBQUNBLFNBQUssSUFBSXBCLElBQUksQ0FBUixFQUFXVyxJQUFJTSxJQUFJbEIsTUFBeEIsRUFBZ0NDLElBQUlXLENBQXBDLEVBQXVDWCxHQUF2QyxFQUE0QztBQUMxQyxZQUFJaUIsSUFBSWpCLENBQUosTUFBV2tCLElBQUlsQixDQUFKLENBQWYsRUFDRW9CO0FBQ0g7QUFFRDtBQUNBLFFBQUksQ0FBQ1YsT0FBTCxFQUNFLE9BQU8sQ0FBUDtBQUVGLFFBQU1XLElBQUtELGlCQUFpQixDQUFsQixHQUF1QixDQUFqQztBQUFBLFFBQ01FLElBQUlaLE9BRFY7QUFHQSxXQUFPLENBQUVZLElBQUlwQixFQUFFSCxNQUFQLEdBQWtCdUIsSUFBSW5CLEVBQUVKLE1BQXhCLEdBQW1DLENBQUN1QixJQUFJRCxDQUFMLElBQVVDLENBQTlDLElBQW9ELENBQTNEO0FBQ0Q7QUF6RUQvQixRQUFBVSxhQUFBLEdBQUFBLGFBQUE7QUEyRUE7OztBQUdBO0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBOzs7QUFHQTtBQUVBOzs7QUFHQTtBQUVBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBQXNCLG1CQUFBLENBQW9DQyxFQUFwQyxFQUFpREMsRUFBakQsRUFBMkQ7QUFDekQsUUFBSUQsTUFBTUMsRUFBVixFQUFjO0FBQ1osZUFBTyxDQUFQO0FBQ0QsS0FGRCxNQUdLO0FBQ0QsWUFBSUMsT0FBT3pCLGNBQWN1QixFQUFkLEVBQWlCQyxFQUFqQixDQUFYO0FBQ0UsWUFBSUUsSUFBSSxHQUFSLENBRkQsQ0FFYztBQUNmLFlBQUloQixJQUFJLENBQVIsQ0FIQyxDQUdTO0FBQ1YsZUFBTWEsR0FBR2IsQ0FBSCxLQUFTYyxHQUFHZCxDQUFILENBQVQsSUFBa0JBLElBQUksQ0FBNUI7QUFDSUE7QUFESixTQUdBLE9BQU9lLE9BQU9mLElBQUlnQixDQUFKLElBQVMsSUFBSUQsSUFBYixDQUFkO0FBQ0g7QUFDRjtBQWJEbkMsUUFBQWdDLG1CQUFBLEdBQUFBLG1CQUFBO0FBZUE7Ozs7Ozs7Ozs7QUFXQTs7Ozs7O0FBTUEsU0FBQUssWUFBQSxDQUE2QkMsTUFBN0IsRUFBNkNDLE1BQTdDLEVBQTJEO0FBQ3pEO0FBQ0EsUUFBSUMsUUFBUUYsT0FBTzlCLE1BQW5CO0FBQ0EsUUFBSWlDLFFBQVFGLE9BQU8vQixNQUFuQjtBQUNBLFFBQUlNLE1BQU1FLEtBQUtGLEdBQUwsQ0FBUzBCLEtBQVQsRUFBZUMsS0FBZixDQUFWO0FBQ0EsUUFBR3pCLEtBQUswQixHQUFMLENBQVNGLFFBQVFDLEtBQWpCLElBQTBCM0IsR0FBN0IsRUFBa0M7QUFDaEMsZUFBTyxHQUFQO0FBQ0Q7QUFDRCxRQUFJNkIsT0FBT1gsb0JBQW9CTSxNQUFwQixFQUEyQkMsTUFBM0IsQ0FBWDtBQUNBOzs7Ozs7O0FBT0EsV0FBT0ksSUFBUDtBQUNBOzs7Ozs7Ozs7OztBQVdEO0FBNUJEM0MsUUFBQXFDLFlBQUEsR0FBQUEsWUFBQTtBQThCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7Ozs7Ozs7OztBQWFBLFNBQUFPLG9CQUFBLENBQXFDakMsQ0FBckMsRUFBZ0RDLENBQWhELEVBQXdEO0FBQ3RELFFBQUkrQixPQUFPTixhQUFhMUIsQ0FBYixFQUFlQyxDQUFmLENBQVg7QUFDQSxRQUFJaUMsS0FBSzdCLEtBQUtGLEdBQUwsQ0FBU0gsRUFBRUgsTUFBWCxFQUFtQkksRUFBRUosTUFBckIsQ0FBVDtBQUNBLFFBQUdtQyxPQUFPLEdBQVAsSUFBZUUsS0FBSyxFQUF2QixFQUE0QjtBQUN4QixZQUFJQyxNQUFPLElBQUssUUFBTSxJQUFQLElBQWMsS0FBR0QsRUFBakIsQ0FBZjtBQUNBLGVBQU8sTUFBUSxDQUFDLE1BQU1GLElBQVAsSUFBY0csR0FBN0I7QUFDSDtBQUNELFdBQU9ILElBQVA7QUFDRDtBQVJEM0MsUUFBQTRDLG9CQUFBLEdBQUFBLG9CQUFBO0FBVUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8vIGJhc2VkIG9uOiBodHRwOi8vZW4ud2lraWJvb2tzLm9yZy93aWtpL0FsZ29yaXRobV9pbXBsZW1lbnRhdGlvbi9TdHJpbmdzL0xldmVuc2h0ZWluX2Rpc3RhbmNlXHJcbi8vIGFuZDogIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGFtZXJhdSVFMiU4MCU5M0xldmVuc2h0ZWluX2Rpc3RhbmNlXHJcblxyXG5cclxuLyoqXHJcbiAqIERpc3RhbmNlIG9mIHN0cmluZ3MgYWxnb3JpdGhtXHJcbiAqIEBtb2R1bGUgZnNkZXZzdGFydC51dGlscy5kYW1lcmF1TGV2ZW5zaHRlaW5cclxuICovXHJcblxyXG4vKipcclxuICogYSBmdW5jdGlvbiBjYWxjdWxhdGluZyBkaXN0YW5jZSBiZXR3ZWVuIHR3byBzdHJpbmdzXHJcbiAqIGFjY29yZGluZyB0byB0aGUgZGFtZXJhdSBMZXZlbnNodGVpbiBhbGdvcml0aG1cclxuICogKHRoaXMgYWxnb3JpdGhtLCBpbiBjb250cmFzdCB0byBwbGFpbiBsZXZlbnNodGVpbiB0cmVhdHNcclxuICogc3dhcHBpbmcgb2YgY2hhcmFjdGVycyBhIGRpc3RhbmNlIDEgIFwid29yZFwiICA8LT4gXCJ3cm9kIClcclxuICogQHBhcmFtIHtzdHJpbmd9IGFcclxuICogQHBhcmFtIHtzdHJpbmd9IGJcclxuICogQHB1YmxpY1xyXG4gKi9cclxuXHJcblxyXG4vKlxyXG5leHBvcnQgZnVuY3Rpb24gbGV2ZW5zaHRlaW5EYW1lcmF1IChhIDogc3RyaW5nLCBiIDogc3RyaW5nKSB7XHJcbiAgdmFyIGkgOiBudW1iZXJcclxuICB2YXIgaiA6IG51bWJlclxyXG4gIHZhciBjb3N0IDogbnVtYmVyXHJcbiAgdmFyIGQgPSBbXVxyXG4gIGlmIChhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIGIubGVuZ3RoXHJcbiAgfVxyXG4gIGlmIChiLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIGEubGVuZ3RoXHJcbiAgfVxyXG4gIGZvciAoaSA9IDA7IGkgPD0gYS5sZW5ndGg7IGkrKykge1xyXG4gICAgZFsgaSBdID0gW11cclxuICAgIGRbIGkgXVsgMCBdID0gaVxyXG4gIH1cclxuICBmb3IgKGogPSAwOyBqIDw9IGIubGVuZ3RoOyBqKyspIHtcclxuICAgIGRbIDAgXVsgaiBdID0galxyXG4gIH1cclxuICBmb3IgKGkgPSAxOyBpIDw9IGEubGVuZ3RoOyBpKyspIHtcclxuICAgIGZvciAoaiA9IDE7IGogPD0gYi5sZW5ndGg7IGorKykge1xyXG4gICAgICBpZiAoYS5jaGFyQXQoaSAtIDEpID09PSBiLmNoYXJBdChqIC0gMSkpIHtcclxuICAgICAgICBjb3N0ID0gMFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvc3QgPSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRbIGkgXVsgaiBdID0gTWF0aC5taW4oZFsgaSAtIDEgXVsgaiBdICsgMSwgZFsgaSBdWyBqIC0gMSBdICsgMSwgZFsgaSAtIDEgXVsgaiAtIDEgXSArIGNvc3QpXHJcblxyXG4gICAgICBpZiAoXHJcblxyXG4gICAgICAgIGkgPiAxICYmXHJcblxyXG4gICAgICAgIGogPiAxICYmXHJcblxyXG4gICAgICAgIGEuY2hhckF0KGkgLSAxKSA9PT0gYi5jaGFyQXQoaiAtIDIpICYmXHJcblxyXG4gICAgICAgIGEuY2hhckF0KGkgLSAyKSA9PT0gYi5jaGFyQXQoaiAtIDEpXHJcblxyXG4gICAgICApIHtcclxuICAgICAgICBkW2ldW2pdID0gTWF0aC5taW4oXHJcblxyXG4gICAgICAgICAgZFtpXVtqXSxcclxuXHJcbiAgICAgICAgICBkW2kgLSAyXVtqIC0gMl0gKyBjb3N0XHJcblxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRbIGEubGVuZ3RoIF1bIGIubGVuZ3RoIF1cclxufVxyXG4qL1xyXG5cclxuLypcclxuZXhwb3J0IGZ1bmN0aW9uIGxldmVuc2h0ZWluIChhIDogc3RyaW5nLCBiIDogc3RyaW5nKSB7XHJcbiAgLy9yZXR1cm4gMi4wICogc2lmdDNEaXN0YW5jZShhLGIpOyAvLyw2LDcpOyAvLyArIGIubGVuZ3RoIC8gMik7XHJcbiAgcmV0dXJuIGxldmVuc2h0ZWluRGFtZXJhdShhLGIpO1xyXG59XHJcbiovXHJcblxyXG5cclxuLypcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaWZ0M0Rpc3RhbmNlKHMxLCBzMikge1xyXG4gICAgaWYgKHMxID09IG51bGwgfHwgczEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHMyID09IG51bGwgfHwgczIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzMi5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzMiA9PSBudWxsIHx8IHMyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBzMS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBpZiAoTWF0aC5hYnMoczEubGVuZ3RoICAtIHMyLmxlbmd0aCkgPiAyMCkge1xyXG4gICAgICByZXR1cm4gIE1hdGgubWF4KHMxLmxlbmd0aCwgczIubGVuZ3RoKS8yO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjID0gMDtcclxuICAgIHZhciBvZmZzZXQxID0gMDtcclxuICAgIHZhciBvZmZzZXQyID0gMDtcclxuICAgIHZhciBsY3MgPSAwO1xyXG4gICAgdmFyIG1heE9mZnNldCA9IDM7XHJcblxyXG4gICAgd2hpbGUgKChjICsgb2Zmc2V0MSA8IHMxLmxlbmd0aCkgJiYgKGMgKyBvZmZzZXQyIDwgczIubGVuZ3RoKSkge1xyXG4gICAgICAgIGlmIChzMS5jaGFyQXQoYyArIG9mZnNldDEpID09IHMyLmNoYXJBdChjICsgb2Zmc2V0MikpIHtcclxuICAgICAgICAgICAgbGNzKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0MSA9IDA7XHJcbiAgICAgICAgICAgIG9mZnNldDIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heE9mZnNldDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGMgKyBpIDwgczEubGVuZ3RoKSAmJiAoczEuY2hhckF0KGMgKyBpKSA9PSBzMi5jaGFyQXQoYykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0MSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKGMgKyBpIDwgczIubGVuZ3RoKSAmJiAoczEuY2hhckF0KGMpID09IHMyLmNoYXJBdChjICsgaSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0MiA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYysrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChzMS5sZW5ndGggKyBzMi5sZW5ndGgpIC8gMiAtIGxjcztcclxufVxyXG4qL1xyXG5cclxuLypcclxuLy8gIFNpZnQ0IC0gY29tbW9uIHZlcnNpb25cclxuLy8gaHR0cHM6Ly9zaWRlcml0ZS5ibG9nc3BvdC5jb20vMjAxNC8xMS9zdXBlci1mYXN0LWFuZC1hY2N1cmF0ZS1zdHJpbmctZGlzdGFuY2UuaHRtbFxyXG4vLyBvbmxpbmUgYWxnb3JpdGhtIHRvIGNvbXB1dGUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHN0cmluZ3MgaW4gTyhuKVxyXG4vLyBtYXhPZmZzZXQgaXMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRvIHNlYXJjaCBmb3IgbWF0Y2hpbmcgbGV0dGVyc1xyXG4vLyBtYXhEaXN0YW5jZSBpcyB0aGUgZGlzdGFuY2UgYXQgd2hpY2ggdGhlIGFsZ29yaXRobSBzaG91bGQgc3RvcCBjb21wdXRpbmcgdGhlIHZhbHVlIGFuZCBqdXN0IGV4aXQgKHRoZSBzdHJpbmdzIGFyZSB0b28gZGlmZmVyZW50IGFueXdheSlcclxuZXhwb3J0IGZ1bmN0aW9uIHNpZnQ0KHMxLCBzMiwgbWF4T2Zmc2V0LCBtYXhEaXN0YW5jZSkge1xyXG4gICAgaWYgKCFzMXx8IXMxLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICghczIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzMi5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzMnx8IXMyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBzMS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGwxPXMxLmxlbmd0aDtcclxuICAgIHZhciBsMj1zMi5sZW5ndGg7XHJcbiAgICBpZihNYXRoLmFicyhsMSAtIGwyKSA+IG1heERpc3RhbmNlKSB7XHJcbiAgICAgIHJldHVybiA1MDAwMDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYzEgPSAwOyAgLy9jdXJzb3IgZm9yIHN0cmluZyAxXHJcbiAgICB2YXIgYzIgPSAwOyAgLy9jdXJzb3IgZm9yIHN0cmluZyAyXHJcbiAgICB2YXIgbGNzcyA9IDA7ICAvL2xhcmdlc3QgY29tbW9uIHN1YnNlcXVlbmNlXHJcbiAgICB2YXIgbG9jYWxfY3MgPSAwOyAvL2xvY2FsIGNvbW1vbiBzdWJzdHJpbmdcclxuICAgIHZhciB0cmFucyA9IDA7ICAvL251bWJlciBvZiB0cmFuc3Bvc2l0aW9ucyAoJ2FiJyB2cyAnYmEnKVxyXG4gICAgdmFyIG9mZnNldF9hcnI9W107ICAvL29mZnNldCBwYWlyIGFycmF5LCBmb3IgY29tcHV0aW5nIHRoZSB0cmFuc3Bvc2l0aW9uc1xyXG5cclxuICAgIHdoaWxlICgoYzEgPCBsMSkgJiYgKGMyIDwgbDIpKSB7XHJcbiAgICAgICAgaWYgKHMxLmNoYXJBdChjMSkgPT0gczIuY2hhckF0KGMyKSkge1xyXG4gICAgICAgICAgICBsb2NhbF9jcysrO1xyXG4gICAgICAgICAgICB2YXIgaXNUcmFucz1mYWxzZTtcclxuICAgICAgICAgICAgLy9zZWUgaWYgY3VycmVudCBtYXRjaCBpcyBhIHRyYW5zcG9zaXRpb25cclxuICAgICAgICAgICAgdmFyIGk9MDtcclxuICAgICAgICAgICAgd2hpbGUgKGk8b2Zmc2V0X2Fyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvZnM9b2Zmc2V0X2FycltpXTtcclxuICAgICAgICAgICAgICAgIGlmIChjMTw9b2ZzLmMxIHx8IGMyIDw9IG9mcy5jMikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gdHdvIG1hdGNoZXMgY3Jvc3MsIHRoZSBvbmUgY29uc2lkZXJlZCBhIHRyYW5zcG9zaXRpb24gaXMgdGhlIG9uZSB3aXRoIHRoZSBsYXJnZXN0IGRpZmZlcmVuY2UgaW4gb2Zmc2V0c1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVHJhbnM9TWF0aC5hYnMoYzItYzEpPj1NYXRoLmFicyhvZnMuYzItb2ZzLmMxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUcmFucylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9mcy50cmFucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2ZzLnRyYW5zPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFucysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYzE+b2ZzLmMyICYmIGMyPm9mcy5jMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRfYXJyLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2Zmc2V0X2Fyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGMxOmMxLFxyXG4gICAgICAgICAgICAgICAgYzI6YzIsXHJcbiAgICAgICAgICAgICAgICB0cmFuczppc1RyYW5zXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxjc3MrPWxvY2FsX2NzO1xyXG4gICAgICAgICAgICBsb2NhbF9jcz0wO1xyXG4gICAgICAgICAgICBpZiAoYzEhPWMyKSB7XHJcbiAgICAgICAgICAgICAgICBjMT1jMj1NYXRoLm1pbihjMSxjMik7ICAvL3VzaW5nIG1pbiBhbGxvd3MgdGhlIGNvbXB1dGF0aW9uIG9mIHRyYW5zcG9zaXRpb25zXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiBtYXRjaGluZyBjaGFyYWN0ZXJzIGFyZSBmb3VuZCwgcmVtb3ZlIDEgZnJvbSBib3RoIGN1cnNvcnMgKHRoZXkgZ2V0IGluY3JlbWVudGVkIGF0IHRoZSBlbmQgb2YgdGhlIGxvb3ApXHJcbiAgICAgICAgICAgIC8vc28gdGhhdCB3ZSBjYW4gaGF2ZSBvbmx5IG9uZSBjb2RlIGJsb2NrIGhhbmRsaW5nIG1hdGNoZXNcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhPZmZzZXQgJiYgKGMxK2k8bDEgfHwgYzIraTxsMik7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKChjMSArIGkgPCBsMSkgJiYgKHMxLmNoYXJBdChjMSArIGkpID09IHMyLmNoYXJBdChjMikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYzErPSBpLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgYzItLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgoYzIgKyBpIDwgbDIpICYmIChzMS5jaGFyQXQoYzEpID09IHMyLmNoYXJBdChjMiArIGkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGMxLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYzIrPSBpLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYzErKztcclxuICAgICAgICBjMisrO1xyXG4gICAgICAgIGlmIChtYXhEaXN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wb3JhcnlEaXN0YW5jZT1NYXRoLm1heChjMSxjMiktbGNzcyt0cmFucztcclxuICAgICAgICAgICAgaWYgKHRlbXBvcmFyeURpc3RhbmNlPj1tYXhEaXN0YW5jZSkgcmV0dXJuIDUwMDAwOyAvLyBNYXRoLnJvdW5kKHRlbXBvcmFyeURpc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyBjb3ZlcnMgdGhlIGNhc2Ugd2hlcmUgdGhlIGxhc3QgbWF0Y2ggaXMgb24gdGhlIGxhc3QgdG9rZW4gaW4gbGlzdCwgc28gdGhhdCBpdCBjYW4gY29tcHV0ZSB0cmFuc3Bvc2l0aW9ucyBjb3JyZWN0bHlcclxuICAgICAgICBpZiAoKGMxID49IGwxKSB8fCAoYzIgPj0gbDIpKSB7XHJcbiAgICAgICAgICAgIGxjc3MrPWxvY2FsX2NzO1xyXG4gICAgICAgICAgICBsb2NhbF9jcz0wO1xyXG4gICAgICAgICAgICBjMT1jMj1NYXRoLm1pbihjMSxjMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGNzcys9bG9jYWxfY3M7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLm1heChsMSxsMiktIGxjc3MgK3RyYW5zKTsgLy9hZGQgdGhlIGNvc3Qgb2YgdHJhbnNwb3NpdGlvbnMgdG8gdGhlIGZpbmFsIHJlc3VsdFxyXG59XHJcblxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRhbGlzbWFuIG1ldHJpY3MvZGlzdGFuY2UvamFyb1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqIEZ1bmN0aW9uIGNvbXB1dGluZyB0aGUgSmFybyBzY29yZS5cclxuICpcclxuICogW1JlZmVyZW5jZV06XHJcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0phcm8lRTIlODAlOTNXaW5rbGVyX2Rpc3RhbmNlXHJcbiAqXHJcbiAqIFtBcnRpY2xlc106XHJcbiAqIEphcm8sIE0uIEEuICgxOTg5KS4gXCJBZHZhbmNlcyBpbiByZWNvcmQgbGlua2FnZSBtZXRob2RvbG9neSBhcyBhcHBsaWVkIHRvXHJcbiAqIHRoZSAxOTg1IGNlbnN1cyBvZiBUYW1wYSBGbG9yaWRhXCIuXHJcbiAqIEpvdXJuYWwgb2YgdGhlIEFtZXJpY2FuIFN0YXRpc3RpY2FsIEFzc29jaWF0aW9uIDg0ICg0MDYpOiA0MTTigJMyMFxyXG4gKlxyXG4gKiBKYXJvLCBNLiBBLiAoMTk5NSkuIFwiUHJvYmFiaWxpc3RpYyBsaW5rYWdlIG9mIGxhcmdlIHB1YmxpYyBoZWFsdGggZGF0YSBmaWxlXCIuXHJcbiAqIFN0YXRpc3RpY3MgaW4gTWVkaWNpbmUgMTQgKDXigJM3KTogNDkx4oCTOC5cclxuICpcclxuICogW1RhZ3NdOiBzZW1pbWV0cmljLCBzdHJpbmcgbWV0cmljLlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gY3JlYXRpbmcgYSB2ZWN0b3Igb2YgbiBkaW1lbnNpb25zIGFuZCBmaWxsaW5nIGl0IHdpdGggYSBzaW5nbGVcclxuICogdmFsdWUgaWYgcmVxdWlyZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAge251bWJlcn0gbiAgICAtIERpbWVuc2lvbnMgb2YgdGhlIHZlY3RvciB0byBjcmVhdGUuXHJcbiAqIEBwYXJhbSAge21peGVkfSAgZmlsbCAtIFZhbHVlIHRvIGJlIHVzZWQgdG8gZmlsbCB0aGUgdmVjdG9yLlxyXG4gKiBAcmV0dXJuIHthcnJheX0gICAgICAgLSBUaGUgcmVzdWx0aW5nIHZlY3Rvci5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMobiwgZmlsbCkge1xyXG4gIGNvbnN0IHZlY3RvciA9IG5ldyBBcnJheShuKTtcclxuXHJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKylcclxuICAgICAgdmVjdG9yW2ldID0gZmlsbDtcclxuICB9XHJcbiAgcmV0dXJuIHZlY3RvcjtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiByZXR1cm5pbmcgdGhlIEphcm8gc2NvcmUgYmV0d2VlbiB0d28gc2VxdWVuY2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHttaXhlZH0gIGEgICAgIC0gVGhlIGZpcnN0IHNlcXVlbmNlLlxyXG4gKiBAcGFyYW0gIHttaXhlZH0gIGIgICAgIC0gVGhlIHNlY29uZCBzZXF1ZW5jZS5cclxuICogQHJldHVybiB7bnVtYmVyfSAgICAgICAtIFRoZSBKYXJvIHNjb3JlIGJldHdlZW4gYSAmIGIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGFsaXNtYW5famFybyhhLCBiKSB7XHJcbiAgLy8gRmFzdCBicmVha1xyXG4gIGlmIChhID09PSBiKVxyXG4gICAgcmV0dXJuIDE7XHJcblxyXG4gIGxldCBtYXgsIG1pbjtcclxuXHJcbiAgaWYgKGEubGVuZ3RoID4gYi5sZW5ndGgpIHtcclxuICAgIG1heCA9IGE7XHJcbiAgICBtaW4gPSBiO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIG1heCA9IGI7XHJcbiAgICBtaW4gPSBhO1xyXG4gIH1cclxuXHJcbiAgLy8gRmluZGluZyBtYXRjaGVzXHJcbiAgY29uc3QgcmFuZ2UgPSBNYXRoLm1heCgoKG1heC5sZW5ndGggLyAyKSB8IDApIC0gMSwgMCksXHJcbiAgICAgICAgaW5kZXhlcyA9IHZlYyhtaW4ubGVuZ3RoLCAtMSksXHJcbiAgICAgICAgZmxhZ3MgPSB2ZWMobWF4Lmxlbmd0aCwgZmFsc2UpO1xyXG5cclxuICBsZXQgbWF0Y2hlcyA9IDA7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwLCBsID0gbWluLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgY29uc3QgY2hhcmFjdGVyID0gbWluW2ldLFxyXG4gICAgICAgICAgeGkgPSBNYXRoLm1heChpIC0gcmFuZ2UsIDApLFxyXG4gICAgICAgICAgeG4gPSBNYXRoLm1pbihpICsgcmFuZ2UgKyAxLCBtYXgubGVuZ3RoKTtcclxuXHJcbiAgICBmb3IgKGxldCBqID0geGksIG0gPSB4bjsgaiA8IG07IGorKykge1xyXG4gICAgICBpZiAoIWZsYWdzW2pdICYmIGNoYXJhY3RlciA9PT0gbWF4W2pdKSB7XHJcbiAgICAgICAgaW5kZXhlc1tpXSA9IGo7XHJcbiAgICAgICAgZmxhZ3Nbal0gPSB0cnVlO1xyXG4gICAgICAgIG1hdGNoZXMrKztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbXMxID0gbmV3IEFycmF5KG1hdGNoZXMpLFxyXG4gICAgICAgIG1zMiA9IG5ldyBBcnJheShtYXRjaGVzKTtcclxuXHJcbiAgbGV0IHNpO1xyXG5cclxuICBzaSA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBtaW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICBpZiAoaW5kZXhlc1tpXSAhPT0gLTEpIHtcclxuICAgICAgbXMxW3NpXSA9IG1pbltpXTtcclxuICAgICAgc2krKztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNpID0gMDtcclxuICBmb3IgKGxldCBpID0gMCwgbCA9IG1heC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIGlmIChmbGFnc1tpXSkge1xyXG4gICAgICBtczJbc2ldID0gbWF4W2ldO1xyXG4gICAgICBzaSsrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IHRyYW5zcG9zaXRpb25zID0gMDtcclxuICBmb3IgKGxldCBpID0gMCwgbCA9IG1zMS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIGlmIChtczFbaV0gIT09IG1zMltpXSlcclxuICAgICAgdHJhbnNwb3NpdGlvbnMrKztcclxuICB9XHJcblxyXG4gIC8vIENvbXB1dGluZyB0aGUgZGlzdGFuY2VcclxuICBpZiAoIW1hdGNoZXMpXHJcbiAgICByZXR1cm4gMDtcclxuXHJcbiAgY29uc3QgdCA9ICh0cmFuc3Bvc2l0aW9ucyAvIDIpIHwgMCxcclxuICAgICAgICBtID0gbWF0Y2hlcztcclxuXHJcbiAgcmV0dXJuICgobSAvIGEubGVuZ3RoKSArIChtIC8gYi5sZW5ndGgpICsgKChtIC0gdCkgLyBtKSkgLyAzO1xyXG59XHJcblxyXG4vKipcclxuICogSmFybyBkaXN0YW5jZSBpcyAxIC0gdGhlIEphcm8gc2NvcmUuXHJcbiAqL1xyXG4vL2NvbnN0IGRpc3RhbmNlID0gKGEsIGIpID0+IDEgLSBqYXJvKGEsIGIpO1xyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFRhbGlzbWFuIG1ldHJpY3MvZGlzdGFuY2UvamFyby13aW5rbGVyXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiBGdW5jdGlvbiBjb21wdXRpbmcgdGhlIEphcm8tV2lua2xlciBzY29yZS5cclxuICpcclxuICogW1JlZmVyZW5jZV06XHJcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0phcm8lRTIlODAlOTNXaW5rbGVyX2Rpc3RhbmNlXHJcbiAqXHJcbiAqIFtBcnRpY2xlXTpcclxuICogV2lua2xlciwgVy4gRS4gKDE5OTApLiBcIlN0cmluZyBDb21wYXJhdG9yIE1ldHJpY3MgYW5kIEVuaGFuY2VkIERlY2lzaW9uIFJ1bGVzXHJcbiAqIGluIHRoZSBGZWxsZWdpLVN1bnRlciBNb2RlbCBvZiBSZWNvcmQgTGlua2FnZVwiLlxyXG4gKiBQcm9jZWVkaW5ncyBvZiB0aGUgU2VjdGlvbiBvbiBTdXJ2ZXkgUmVzZWFyY2ggTWV0aG9kc1xyXG4gKiAoQW1lcmljYW4gU3RhdGlzdGljYWwgQXNzb2NpYXRpb24pOiAzNTTigJMzNTkuXHJcbiAqXHJcbiAqIFtUYWdzXTogc2VtaW1ldHJpYywgc3RyaW5nIG1ldHJpYy5cclxuICovXHJcblxyXG4vKipcclxuICogSmFyby1XaW5rbGVyIHN0YW5kYXJkIGZ1bmN0aW9uLlxyXG4gKi9cclxuLy9leHBvcnQgY29uc3QgamFyb1dpbmtsZXIgPSBjdXN0b21KYXJvV2lua2xlci5iaW5kKG51bGwsIG51bGwpO1xyXG5cclxuLyoqXHJcbiAqIEphcm8tV2lua2xlciBkaXN0YW5jZSBpcyAxIC0gdGhlIEphcm8tV2lua2xlciBzY29yZS5cclxuICovXHJcbi8vY29uc3QgZGlzdGFuY2UgPSAoYSwgYikgPT4gMSAtIGphcm9XaW5rbGVyKGEsIGIpO1xyXG5cclxuLyoqXHJcbiAqIEV4cG9ydGluZy5cclxuICovXHJcblxyXG5cclxuLy8gQ29tcHV0ZXMgdGhlIFdpbmtsZXIgZGlzdGFuY2UgYmV0d2VlbiB0d28gc3RyaW5nIC0tIGludHJlcHJldGVkIGZyb206XHJcbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSmFybyVFMiU4MCU5M1dpbmtsZXJfZGlzdGFuY2VcclxuLy8gczEgaXMgdGhlIGZpcnN0IHN0cmluZyB0byBjb21wYXJlXHJcbi8vIHMyIGlzIHRoZSBzZWNvbmQgc3RyaW5nIHRvIGNvbXBhcmVcclxuLy8gZGogaXMgdGhlIEphcm8gRGlzdGFuY2UgKGlmIHlvdSd2ZSBhbHJlYWR5IGNvbXB1dGVkIGl0KSwgbGVhdmUgYmxhbmsgYW5kIHRoZSBtZXRob2QgaGFuZGxlcyBpdFxyXG5leHBvcnQgZnVuY3Rpb24gamFyb1dpbmtsZXJEaXN0YW5jZShzMSA6IHN0cmluZywgczI6IHN0cmluZykge1xyXG5cdFx0aWYgKHMxID09IHMyKSB7XHJcblx0XHRcdFx0cmV0dXJuIDFcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0ICAgIHZhciBqYXJvID0gdGFsaXNtYW5famFybyhzMSxzMik7XHJcbiAgICAgICAgdmFyIHAgPSAwLjE7IC8vXHJcblx0XHQgICAgdmFyIGwgPSAwIC8vIGxlbmd0aCBvZiB0aGUgbWF0Y2hpbmcgcHJlZml4XHJcblx0XHQgICAgd2hpbGUoczFbbF0gPT0gczJbbF0gJiYgbCA8IDQpXHJcblx0XHQgICAgICAgIGwrKztcclxuXHJcblx0XHQgICAgcmV0dXJuIGphcm8gKyBsICogcCAqICgxIC0gamFybyk7XHJcblx0XHR9XHJcbn1cclxuXHJcbi8qXHJcblxyXG5mdW5jdGlvbiBjbnRDaGFycyhzdHIgOiBzdHJpbmcsIGxlbiA6IG51bWJlcikge1xyXG4gIHZhciBjbnQgPSAwO1xyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgY250ICs9IChzdHIuY2hhckF0KGkpID09PSAnWCcpPyAxIDogMDtcclxuICB9XHJcbiAgcmV0dXJuIGNudDtcclxufVxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBzVGV4dCB7c3RyaW5nfSB0aGUgdGV4dCB0byBtYXRjaCB0byBOYXZUYXJnZXRSZXNvbHV0aW9uXHJcbiAqIEBwYXJhbSBzVGV4dDIge3N0cmluZ30gdGhlIHF1ZXJ5IHRleHQsIGUuZy4gTmF2VGFyZ2V0XHJcbiAqXHJcbiAqIEByZXR1cm4gdGhlIGRpc3RhbmNlLCBub3RlIHRoYXQgaXMgaXMgKm5vdCogc3ltbWV0cmljIVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNEaXN0YW5jZShzVGV4dDE6IHN0cmluZywgc1RleHQyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gIC8vIGNvbnNvbGUubG9nKFwibGVuZ3RoMlwiICsgc1RleHQxICsgXCIgLSBcIiArIHNUZXh0MilcclxuICB2YXIgczFsZW4gPSBzVGV4dDEubGVuZ3RoO1xyXG4gIHZhciBzMmxlbiA9IHNUZXh0Mi5sZW5ndGg7XHJcbiAgdmFyIG1pbiA9IE1hdGgubWluKHMxbGVuLHMybGVuKTtcclxuICBpZihNYXRoLmFicyhzMWxlbiAtIHMybGVuKSA+IG1pbikge1xyXG4gICAgcmV0dXJuIDAuMztcclxuICB9XHJcbiAgdmFyIGRpc3QgPSBqYXJvV2lua2xlckRpc3RhbmNlKHNUZXh0MSxzVGV4dDIpO1xyXG4gIC8qXHJcbiAgdmFyIGNudDEgPSBjbnRDaGFycyhzVGV4dDEsIHMxbGVuKTtcclxuICB2YXIgY250MiA9IGNudENoYXJzKHNUZXh0MiwgczJsZW4pO1xyXG4gIGlmKGNudDEgIT09IGNudDIpIHtcclxuICAgIGRpc3QgPSBkaXN0ICogMC43O1xyXG4gIH1cclxuICAqL1xyXG4gIHJldHVybiBkaXN0O1xyXG4gIC8qXHJcbiAgdmFyIGEwID0gZGlzdGFuY2UubGV2ZW5zaHRlaW4oc1RleHQxLnN1YnN0cmluZygwLCBzVGV4dDIubGVuZ3RoKSwgc1RleHQyKVxyXG4gIGlmKGRlYnVnbG9nVi5lbmFibGVkKSB7XHJcbiAgICBkZWJ1Z2xvZ1YoXCJkaXN0YW5jZVwiICsgYTAgKyBcInN0cmlwcGVkPlwiICsgc1RleHQxLnN1YnN0cmluZygwLHNUZXh0Mi5sZW5ndGgpICsgXCI8PlwiICsgc1RleHQyKyBcIjxcIik7XHJcbiAgfVxyXG4gIGlmKGEwICogNTAgPiAxNSAqIHNUZXh0Mi5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIDQwMDAwO1xyXG4gIH1cclxuICB2YXIgYSA9IGRpc3RhbmNlLmxldmVuc2h0ZWluKHNUZXh0MSwgc1RleHQyKVxyXG4gIHJldHVybiBhMCAqIDUwMCAvIHNUZXh0Mi5sZW5ndGggKyBhXHJcbiAgKi9cclxufVxyXG5cclxuLypcclxudmFyIGZhY0FkanVzdERpc3RhbmNlID0gW107XHJcbnZhciB1ID0gXCJhXCI7XHJcbmZvcih2YXIgaSA9IDI7IGkgPCAxNTsgKytpKSB7XHJcbiAgdmFyIHVuID0gdSArIFN0cmluZy5mcm9tQ2hhckNvZGUoJ0EnLmNoYXJDb2RlQXQoMCkgKyBpICsgMSApO1xyXG4gIGNvbnNvbGUubG9nKHVuKTtcclxuICBmYWNBZGp1c3REaXN0YW5jZVt1Lmxlbmd0aF0gPSAoMS0wLjk4MDEwMDApLyAoMS4wIC0gY2FsY0Rpc3RhbmNlKHUsdW4pKTtcclxuICB1ID0gdW47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjRGlzdGFuY2VBZGp1c3RlZDIoYTogc3RyaW5nLCBiOnN0cmluZykgOiBudW1iZXIge1xyXG4gIHZhciBkaXN0ID0gY2FsY0Rpc3RhbmNlKGEsYik7XHJcbiAgdmFyIG1sID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcclxuICBpZihkaXN0IDwgMS4wICYmIChtbCA8IDE1KSAmJiAgKG1sID4gMikpIHtcclxuICAgICAgcmV0dXJuIDEuMCAgLSAgKDEuMC0gZGlzdCkgKiBmYWNBZGp1c3REaXN0YW5jZVttbF07XHJcbiAgfVxyXG4gIHJldHVybiBkaXN0O1xyXG59XHJcbiovXHJcblxyXG4vKipcclxuICogVGhlIGFkanVzdG1lbnQgaXMgY2hvc2VuIGluIHRoZSBmb2xsb3dpbmcgd2F5LFxyXG4gKiBhIHNpbmdsZSBcImFkZGVkXCIgY2hhcmFjdGVyIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZyBmaXRzXHJcbiAqIGlzIFwibGlmdGVkIGF0IGxlbmd0aCA1XCIgdG8gMC45OFxyXG4gKiAgIDEuNjY1ID0gICggMSAtIGNhbGNEaXN0YW5jZSgnYWJjZGUnLCdhYmNkZV8nKSkgLyAwLjk4XHJcbiAqXHJcbiAqIFRoZSBmdW5jdGlvbiBpcyBzbW9vdGhseSB0byBtZXJnZSBhdCBsZW5ndGggMjA7XHJcbiAqICAgZmFjID0oKDIwLWxlbikvKDE1KSkqMC42NjUgKzFcclxuICogICByZXMgPSAxLSAoMS1kKS9mYWM7XHJcbiAqL1xyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY0Rpc3RhbmNlQWRqdXN0ZWQoYTogc3RyaW5nLCBiOnN0cmluZykgOiBudW1iZXIge1xyXG4gIHZhciBkaXN0ID0gY2FsY0Rpc3RhbmNlKGEsYik7XHJcbiAgdmFyIG1sID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcclxuICBpZihkaXN0IDwgMS4wICYmIChtbCA8IDIwKSkge1xyXG4gICAgICB2YXIgZmFjID0gIDEgKyAoMC42NjUvMTUuMCkqKDIwLW1sKTtcclxuICAgICAgcmV0dXJuIDEuMCAgLSAgKDEuMCAtIGRpc3QpIC9mYWM7XHJcbiAgfVxyXG4gIHJldHVybiBkaXN0O1xyXG59XHJcblxyXG4vKlxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hhckF0KHN0ciwgbikge1xyXG4gIGlmKHN0ci5sZW5ndGggPiBuKSB7XHJcbiAgICByZXR1cm4gc3RyLmNoYXJBdChuKTtcclxuICB9XHJcbiAgcmV0dXJuICcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRIZWFkKHN0cix1KSB7XHJcbiAgdSA9IE1hdGgubWluKHN0ci5sZW5ndGgsIHUpO1xyXG4gIHUgPSBNYXRoLm1heCgwLHUpO1xyXG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKDAsdSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhaWwoc3RyLHApIHtcclxuICByZXR1cm4gc3RyLnN1YnN0cmluZyhwKTtcclxufVxyXG5cclxudmFyIHN0cnMgPSBbXCJBXCJdO1xyXG52YXIgdSA9IFwiQVwiO1xyXG5mb3IodmFyIGkgPSAxOyBpIDwgMjU7ICsraSkge1xyXG4gIHZhciB1biA9IHUgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgaSApO1xyXG4gIHN0cnNbdW4ubGVuZ3RoLTFdID0gdW47XHJcbiAgY29uc29sZS5sb2codW4pO1xyXG4gIGZhY0FkanVzdERpc3RhbmNlW3UubGVuZ3RoXSA9ICgxLTAuOTgwMTAwMCkvICgxLjAgLSBjYWxjRGlzdGFuY2UodSx1bikpO1xyXG4gIHUgPSB1bjtcclxufVxyXG5cclxudmFyIHJlcyA9IFtdO1xyXG5cclxudmFyIHJlczIgPSBbXTtcclxuZm9yKHZhciBpID0gMTsgaSA8IHN0cnMubGVuZ3RoOyArK2kpIHtcclxuICB2YXIgc3RyID0gc3Ryc1tpXTtcclxuICB2YXIgbmMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdhJy5jaGFyQ29kZUF0KDApICsgMippICsgMiApO1xyXG4gIHZhciBuYyA9ICdfJztcclxuICB2YXIgYWRkVGFpbCA9IHN0ciAgKyBuYztcclxuICB2YXIgYWRkRnJvbnQgPSBuYyArIHN0cjtcclxuICB2YXIgbmMyID0gJy8nOyAvL1N0cmluZy5mcm9tQ2hhckNvZGUoJ2EnLmNoYXJDb2RlQXQoMCkgKyAyKmkgKyAzICk7XHJcblxyXG4gIHZhciBkaWZmTWlkID0gZ2V0SGVhZChzdHIsTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpKSAgKyBuYyAgKyBnZXRUYWlsKHN0ciwgTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpKzEpO1xyXG4gIHZhciBkaWZmTWlkMiA9IHN0cnNbaV0uc3Vic3RyaW5nKDAsIE1hdGguZmxvb3Ioc3RyLmxlbmd0aC8yKS0xKSArIG5jICsgbmMyICsgZ2V0VGFpbChzdHIsTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpKzEpO1xyXG4gIHZhciBkaWZmRW5kID0gc3Ryc1tpXS5zdWJzdHJpbmcoMCwgc3Ryc1tpXS5sZW5ndGggLSAxKSArIG5jO1xyXG4gIHZhciBkaWZmU3RhcnQgPSBuYyArIHN0cnNbaV0uc3Vic3RyaW5nKDEpO1xyXG4gIHZhciBzd2FwRnJvbnQgPSBzdHIuc3Vic3RyaW5nKDAsMikgKyBnZXRDaGFyQXQoc3RyLDMpICsgZ2V0Q2hhckF0KHN0ciwyKSArIHN0ci5zdWJzdHJpbmcoNCk7XHJcbiAgdmFyIHN3YXBNaWQgPSBnZXRIZWFkKHN0ciwgTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpLTEpICArIGdldENoYXJBdChzdHIsTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpKSArIGdldENoYXJBdChzdHIsTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpLTEpICArIGdldFRhaWwoc3RyLE1hdGguZmxvb3Ioc3RyLmxlbmd0aC8yKSsxKTtcclxuICB2YXIgc3dhcEVuZCA9IGdldEhlYWQoc3RyLCBzdHIubGVuZ3RoIC0gMikgKyBnZXRDaGFyQXQoc3RyLHN0ci5sZW5ndGgtMSkgKyBnZXRDaGFyQXQoc3RyLHN0ci5sZW5ndGgtMik7XHJcblxyXG4gIHZhciByID0gW2RpZmZTdGFydCwgZGlmZk1pZCwgZGlmZkVuZCwgYWRkRnJvbnQsIGFkZFRhaWwsIGRpZmZNaWQyLCBzd2FwRnJvbnQsIHN3YXBNaWQsIHN3YXBFbmQgXTtcclxuICBjb25zb2xlLmxvZygnKioqKlxcbicgKyBzdHIgKydcXG4nICsgci5qb2luKFwiXFxuXCIpKTtcclxuICBpZiggaSA9PT0gMSkge1xyXG4gICAgcmVzLnB1c2goYGlcXHRkaWZmU3RhcnRcXHRkaWZmTWlkXFx0ZGlmZkVuZFxcdGFkZEZyb250XFx0YWRkVGFpbFxcdGRpZmZNaWQyXFx0c3dhcEZyb250XFx0c3dhcE1pZFxcdHN3YXBFbmRcXG5gKTtcclxuICAgIHJlczIucHVzaChgaVxcdGRpZmZTdGFydFxcdGRpZmZNaWRcXHRkaWZmRW5kXFx0YWRkRnJvbnRcXHRhZGRUYWlsXFx0ZGlmZk1pZDJcXHRzd2FwRnJvbnRcXHRzd2FwTWlkXFx0c3dhcEVuZFxcbmApO1xyXG4gIH1cclxuICByZXMucHVzaChgJHtzdHIubGVuZ3RofVxcdGAgKyByLm1hcChzID0+IGNhbGNEaXN0YW5jZShzdHIscykudG9GaXhlZCg0KSkuam9pbihcIlxcdFwiKSArICdcXG4nKTtcclxuICByZXMyLnB1c2goYCR7c3RyLmxlbmd0aH1cXHRgICsgci5tYXAocyA9PiBjYWxjRGlzdGFuY2VBZGp1c3RlZChzdHIscykudG9GaXhlZCg0KSkuam9pbihcIlxcdFwiKSArICdcXG4nKTtcclxufVxyXG5cclxuXHJcbmNvbnNvbGUubG9nKHJlcy5qb2luKCcnKSk7XHJcblxyXG5jb25zb2xlLmxvZygnLS0tJyk7XHJcbmNvbnNvbGUubG9nKHJlczIuam9pbignJykpO1xyXG5cclxudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuZnMud3JpdGVGaWxlU3luYygnbGV2ZW4udHh0JywgcmVzLmpvaW4oJycpICsgJ1xcbicgKyByZXMyLmpvaW4oJycpKTtcclxuXHJcbiovXHJcblxyXG5cclxuXHJcblxyXG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBiYXNlZCBvbjogaHR0cDovL2VuLndpa2lib29rcy5vcmcvd2lraS9BbGdvcml0aG1faW1wbGVtZW50YXRpb24vU3RyaW5ncy9MZXZlbnNodGVpbl9kaXN0YW5jZVxuLy8gYW5kOiAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EYW1lcmF1JUUyJTgwJTkzTGV2ZW5zaHRlaW5fZGlzdGFuY2Vcbi8qKlxuICogRGlzdGFuY2Ugb2Ygc3RyaW5ncyBhbGdvcml0aG1cbiAqIEBtb2R1bGUgZnNkZXZzdGFydC51dGlscy5kYW1lcmF1TGV2ZW5zaHRlaW5cbiAqL1xuLyoqXG4gKiBhIGZ1bmN0aW9uIGNhbGN1bGF0aW5nIGRpc3RhbmNlIGJldHdlZW4gdHdvIHN0cmluZ3NcbiAqIGFjY29yZGluZyB0byB0aGUgZGFtZXJhdSBMZXZlbnNodGVpbiBhbGdvcml0aG1cbiAqICh0aGlzIGFsZ29yaXRobSwgaW4gY29udHJhc3QgdG8gcGxhaW4gbGV2ZW5zaHRlaW4gdHJlYXRzXG4gKiBzd2FwcGluZyBvZiBjaGFyYWN0ZXJzIGEgZGlzdGFuY2UgMSAgXCJ3b3JkXCIgIDwtPiBcIndyb2QgKVxuICogQHBhcmFtIHtzdHJpbmd9IGFcbiAqIEBwYXJhbSB7c3RyaW5nfSBiXG4gKiBAcHVibGljXG4gKi9cbi8qXG5leHBvcnQgZnVuY3Rpb24gbGV2ZW5zaHRlaW5EYW1lcmF1IChhIDogc3RyaW5nLCBiIDogc3RyaW5nKSB7XG4gIHZhciBpIDogbnVtYmVyXG4gIHZhciBqIDogbnVtYmVyXG4gIHZhciBjb3N0IDogbnVtYmVyXG4gIHZhciBkID0gW11cbiAgaWYgKGEubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGIubGVuZ3RoXG4gIH1cbiAgaWYgKGIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGEubGVuZ3RoXG4gIH1cbiAgZm9yIChpID0gMDsgaSA8PSBhLmxlbmd0aDsgaSsrKSB7XG4gICAgZFsgaSBdID0gW11cbiAgICBkWyBpIF1bIDAgXSA9IGlcbiAgfVxuICBmb3IgKGogPSAwOyBqIDw9IGIubGVuZ3RoOyBqKyspIHtcbiAgICBkWyAwIF1bIGogXSA9IGpcbiAgfVxuICBmb3IgKGkgPSAxOyBpIDw9IGEubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGogPSAxOyBqIDw9IGIubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChhLmNoYXJBdChpIC0gMSkgPT09IGIuY2hhckF0KGogLSAxKSkge1xuICAgICAgICBjb3N0ID0gMFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29zdCA9IDFcbiAgICAgIH1cblxyXG4gICAgICBkWyBpIF1bIGogXSA9IE1hdGgubWluKGRbIGkgLSAxIF1bIGogXSArIDEsIGRbIGkgXVsgaiAtIDEgXSArIDEsIGRbIGkgLSAxIF1bIGogLSAxIF0gKyBjb3N0KVxuXHJcbiAgICAgIGlmIChcblxyXG4gICAgICAgIGkgPiAxICYmXG5cclxuICAgICAgICBqID4gMSAmJlxuXHJcbiAgICAgICAgYS5jaGFyQXQoaSAtIDEpID09PSBiLmNoYXJBdChqIC0gMikgJiZcblxyXG4gICAgICAgIGEuY2hhckF0KGkgLSAyKSA9PT0gYi5jaGFyQXQoaiAtIDEpXG5cclxuICAgICAgKSB7XG4gICAgICAgIGRbaV1bal0gPSBNYXRoLm1pbihcblxyXG4gICAgICAgICAgZFtpXVtqXSxcblxyXG4gICAgICAgICAgZFtpIC0gMl1baiAtIDJdICsgY29zdFxuXHJcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXHJcbiAgcmV0dXJuIGRbIGEubGVuZ3RoIF1bIGIubGVuZ3RoIF1cbn1cbiovXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIGxldmVuc2h0ZWluIChhIDogc3RyaW5nLCBiIDogc3RyaW5nKSB7XG4gIC8vcmV0dXJuIDIuMCAqIHNpZnQzRGlzdGFuY2UoYSxiKTsgLy8sNiw3KTsgLy8gKyBiLmxlbmd0aCAvIDIpO1xuICByZXR1cm4gbGV2ZW5zaHRlaW5EYW1lcmF1KGEsYik7XG59XG4qL1xuLypcblxyXG5leHBvcnQgZnVuY3Rpb24gc2lmdDNEaXN0YW5jZShzMSwgczIpIHtcbiAgICBpZiAoczEgPT0gbnVsbCB8fCBzMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHMyID09IG51bGwgfHwgczIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzMi5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cclxuICAgIGlmIChzMiA9PSBudWxsIHx8IHMyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gczEubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMoczEubGVuZ3RoICAtIHMyLmxlbmd0aCkgPiAyMCkge1xuICAgICAgcmV0dXJuICBNYXRoLm1heChzMS5sZW5ndGgsIHMyLmxlbmd0aCkvMjtcbiAgICB9XG5cclxuICAgIHZhciBjID0gMDtcbiAgICB2YXIgb2Zmc2V0MSA9IDA7XG4gICAgdmFyIG9mZnNldDIgPSAwO1xuICAgIHZhciBsY3MgPSAwO1xuICAgIHZhciBtYXhPZmZzZXQgPSAzO1xuXHJcbiAgICB3aGlsZSAoKGMgKyBvZmZzZXQxIDwgczEubGVuZ3RoKSAmJiAoYyArIG9mZnNldDIgPCBzMi5sZW5ndGgpKSB7XG4gICAgICAgIGlmIChzMS5jaGFyQXQoYyArIG9mZnNldDEpID09IHMyLmNoYXJBdChjICsgb2Zmc2V0MikpIHtcbiAgICAgICAgICAgIGxjcysrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0MSA9IDA7XG4gICAgICAgICAgICBvZmZzZXQyID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4T2Zmc2V0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGMgKyBpIDwgczEubGVuZ3RoKSAmJiAoczEuY2hhckF0KGMgKyBpKSA9PSBzMi5jaGFyQXQoYykpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDEgPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChjICsgaSA8IHMyLmxlbmd0aCkgJiYgKHMxLmNoYXJBdChjKSA9PSBzMi5jaGFyQXQoYyArIGkpKSkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQyID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGMrKztcbiAgICB9XG4gICAgcmV0dXJuIChzMS5sZW5ndGggKyBzMi5sZW5ndGgpIC8gMiAtIGxjcztcbn1cbiovXG4vKlxuLy8gIFNpZnQ0IC0gY29tbW9uIHZlcnNpb25cbi8vIGh0dHBzOi8vc2lkZXJpdGUuYmxvZ3Nwb3QuY29tLzIwMTQvMTEvc3VwZXItZmFzdC1hbmQtYWNjdXJhdGUtc3RyaW5nLWRpc3RhbmNlLmh0bWxcbi8vIG9ubGluZSBhbGdvcml0aG0gdG8gY29tcHV0ZSB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gc3RyaW5ncyBpbiBPKG4pXG4vLyBtYXhPZmZzZXQgaXMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRvIHNlYXJjaCBmb3IgbWF0Y2hpbmcgbGV0dGVyc1xuLy8gbWF4RGlzdGFuY2UgaXMgdGhlIGRpc3RhbmNlIGF0IHdoaWNoIHRoZSBhbGdvcml0aG0gc2hvdWxkIHN0b3AgY29tcHV0aW5nIHRoZSB2YWx1ZSBhbmQganVzdCBleGl0ICh0aGUgc3RyaW5ncyBhcmUgdG9vIGRpZmZlcmVudCBhbnl3YXkpXG5leHBvcnQgZnVuY3Rpb24gc2lmdDQoczEsIHMyLCBtYXhPZmZzZXQsIG1heERpc3RhbmNlKSB7XG4gICAgaWYgKCFzMXx8IXMxLmxlbmd0aCkge1xuICAgICAgICBpZiAoIXMyKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gczIubGVuZ3RoO1xuICAgIH1cblxyXG4gICAgaWYgKCFzMnx8IXMyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gczEubGVuZ3RoO1xuICAgIH1cblxyXG4gICAgdmFyIGwxPXMxLmxlbmd0aDtcbiAgICB2YXIgbDI9czIubGVuZ3RoO1xuICAgIGlmKE1hdGguYWJzKGwxIC0gbDIpID4gbWF4RGlzdGFuY2UpIHtcbiAgICAgIHJldHVybiA1MDAwMDtcbiAgICB9XG5cclxuICAgIHZhciBjMSA9IDA7ICAvL2N1cnNvciBmb3Igc3RyaW5nIDFcbiAgICB2YXIgYzIgPSAwOyAgLy9jdXJzb3IgZm9yIHN0cmluZyAyXG4gICAgdmFyIGxjc3MgPSAwOyAgLy9sYXJnZXN0IGNvbW1vbiBzdWJzZXF1ZW5jZVxuICAgIHZhciBsb2NhbF9jcyA9IDA7IC8vbG9jYWwgY29tbW9uIHN1YnN0cmluZ1xuICAgIHZhciB0cmFucyA9IDA7ICAvL251bWJlciBvZiB0cmFuc3Bvc2l0aW9ucyAoJ2FiJyB2cyAnYmEnKVxuICAgIHZhciBvZmZzZXRfYXJyPVtdOyAgLy9vZmZzZXQgcGFpciBhcnJheSwgZm9yIGNvbXB1dGluZyB0aGUgdHJhbnNwb3NpdGlvbnNcblxyXG4gICAgd2hpbGUgKChjMSA8IGwxKSAmJiAoYzIgPCBsMikpIHtcbiAgICAgICAgaWYgKHMxLmNoYXJBdChjMSkgPT0gczIuY2hhckF0KGMyKSkge1xuICAgICAgICAgICAgbG9jYWxfY3MrKztcbiAgICAgICAgICAgIHZhciBpc1RyYW5zPWZhbHNlO1xuICAgICAgICAgICAgLy9zZWUgaWYgY3VycmVudCBtYXRjaCBpcyBhIHRyYW5zcG9zaXRpb25cbiAgICAgICAgICAgIHZhciBpPTA7XG4gICAgICAgICAgICB3aGlsZSAoaTxvZmZzZXRfYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBvZnM9b2Zmc2V0X2FycltpXTtcbiAgICAgICAgICAgICAgICBpZiAoYzE8PW9mcy5jMSB8fCBjMiA8PSBvZnMuYzIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB0d28gbWF0Y2hlcyBjcm9zcywgdGhlIG9uZSBjb25zaWRlcmVkIGEgdHJhbnNwb3NpdGlvbiBpcyB0aGUgb25lIHdpdGggdGhlIGxhcmdlc3QgZGlmZmVyZW5jZSBpbiBvZmZzZXRzXG4gICAgICAgICAgICAgICAgICAgIGlzVHJhbnM9TWF0aC5hYnMoYzItYzEpPj1NYXRoLmFicyhvZnMuYzItb2ZzLmMxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVHJhbnMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zKys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9mcy50cmFucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mcy50cmFucz10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGMxPm9mcy5jMiAmJiBjMj5vZnMuYzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldF9hcnIuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvZmZzZXRfYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGMxOmMxLFxuICAgICAgICAgICAgICAgIGMyOmMyLFxuICAgICAgICAgICAgICAgIHRyYW5zOmlzVHJhbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGNzcys9bG9jYWxfY3M7XG4gICAgICAgICAgICBsb2NhbF9jcz0wO1xuICAgICAgICAgICAgaWYgKGMxIT1jMikge1xuICAgICAgICAgICAgICAgIGMxPWMyPU1hdGgubWluKGMxLGMyKTsgIC8vdXNpbmcgbWluIGFsbG93cyB0aGUgY29tcHV0YXRpb24gb2YgdHJhbnNwb3NpdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vaWYgbWF0Y2hpbmcgY2hhcmFjdGVycyBhcmUgZm91bmQsIHJlbW92ZSAxIGZyb20gYm90aCBjdXJzb3JzICh0aGV5IGdldCBpbmNyZW1lbnRlZCBhdCB0aGUgZW5kIG9mIHRoZSBsb29wKVxuICAgICAgICAgICAgLy9zbyB0aGF0IHdlIGNhbiBoYXZlIG9ubHkgb25lIGNvZGUgYmxvY2sgaGFuZGxpbmcgbWF0Y2hlc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhPZmZzZXQgJiYgKGMxK2k8bDEgfHwgYzIraTxsMik7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICgoYzEgKyBpIDwgbDEpICYmIChzMS5jaGFyQXQoYzEgKyBpKSA9PSBzMi5jaGFyQXQoYzIpKSkge1xuICAgICAgICAgICAgICAgICAgICBjMSs9IGktMTtcbiAgICAgICAgICAgICAgICAgICAgYzItLTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoYzIgKyBpIDwgbDIpICYmIChzMS5jaGFyQXQoYzEpID09IHMyLmNoYXJBdChjMiArIGkpKSkge1xuICAgICAgICAgICAgICAgICAgICBjMS0tO1xuICAgICAgICAgICAgICAgICAgICBjMis9IGktMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGMxKys7XG4gICAgICAgIGMyKys7XG4gICAgICAgIGlmIChtYXhEaXN0YW5jZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRlbXBvcmFyeURpc3RhbmNlPU1hdGgubWF4KGMxLGMyKS1sY3NzK3RyYW5zO1xuICAgICAgICAgICAgaWYgKHRlbXBvcmFyeURpc3RhbmNlPj1tYXhEaXN0YW5jZSkgcmV0dXJuIDUwMDAwOyAvLyBNYXRoLnJvdW5kKHRlbXBvcmFyeURpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzIGNvdmVycyB0aGUgY2FzZSB3aGVyZSB0aGUgbGFzdCBtYXRjaCBpcyBvbiB0aGUgbGFzdCB0b2tlbiBpbiBsaXN0LCBzbyB0aGF0IGl0IGNhbiBjb21wdXRlIHRyYW5zcG9zaXRpb25zIGNvcnJlY3RseVxuICAgICAgICBpZiAoKGMxID49IGwxKSB8fCAoYzIgPj0gbDIpKSB7XG4gICAgICAgICAgICBsY3NzKz1sb2NhbF9jcztcbiAgICAgICAgICAgIGxvY2FsX2NzPTA7XG4gICAgICAgICAgICBjMT1jMj1NYXRoLm1pbihjMSxjMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGNzcys9bG9jYWxfY3M7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5tYXgobDEsbDIpLSBsY3NzICt0cmFucyk7IC8vYWRkIHRoZSBjb3N0IG9mIHRyYW5zcG9zaXRpb25zIHRvIHRoZSBmaW5hbCByZXN1bHRcbn1cblxyXG4qL1xuLyoqXG4gKiBUYWxpc21hbiBtZXRyaWNzL2Rpc3RhbmNlL2phcm9cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqXG4gKiBGdW5jdGlvbiBjb21wdXRpbmcgdGhlIEphcm8gc2NvcmUuXG4gKlxuICogW1JlZmVyZW5jZV06XG4gKiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9KYXJvJUUyJTgwJTkzV2lua2xlcl9kaXN0YW5jZVxuICpcbiAqIFtBcnRpY2xlc106XG4gKiBKYXJvLCBNLiBBLiAoMTk4OSkuIFwiQWR2YW5jZXMgaW4gcmVjb3JkIGxpbmthZ2UgbWV0aG9kb2xvZ3kgYXMgYXBwbGllZCB0b1xuICogdGhlIDE5ODUgY2Vuc3VzIG9mIFRhbXBhIEZsb3JpZGFcIi5cbiAqIEpvdXJuYWwgb2YgdGhlIEFtZXJpY2FuIFN0YXRpc3RpY2FsIEFzc29jaWF0aW9uIDg0ICg0MDYpOiA0MTTigJMyMFxuICpcbiAqIEphcm8sIE0uIEEuICgxOTk1KS4gXCJQcm9iYWJpbGlzdGljIGxpbmthZ2Ugb2YgbGFyZ2UgcHVibGljIGhlYWx0aCBkYXRhIGZpbGVcIi5cbiAqIFN0YXRpc3RpY3MgaW4gTWVkaWNpbmUgMTQgKDXigJM3KTogNDkx4oCTOC5cbiAqXG4gKiBbVGFnc106IHNlbWltZXRyaWMsIHN0cmluZyBtZXRyaWMuXG4gKi9cbi8qKlxuICogRnVuY3Rpb24gY3JlYXRpbmcgYSB2ZWN0b3Igb2YgbiBkaW1lbnNpb25zIGFuZCBmaWxsaW5nIGl0IHdpdGggYSBzaW5nbGVcbiAqIHZhbHVlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gbiAgICAtIERpbWVuc2lvbnMgb2YgdGhlIHZlY3RvciB0byBjcmVhdGUuXG4gKiBAcGFyYW0gIHttaXhlZH0gIGZpbGwgLSBWYWx1ZSB0byBiZSB1c2VkIHRvIGZpbGwgdGhlIHZlY3Rvci5cbiAqIEByZXR1cm4ge2FycmF5fSAgICAgICAtIFRoZSByZXN1bHRpbmcgdmVjdG9yLlxuICovXG5mdW5jdGlvbiB2ZWMobiwgZmlsbCkge1xuICAgIHZhciB2ZWN0b3IgPSBuZXcgQXJyYXkobik7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKVxuICAgICAgICAgICAgdmVjdG9yW2ldID0gZmlsbDtcbiAgICB9XG4gICAgcmV0dXJuIHZlY3Rvcjtcbn1cbmV4cG9ydHMudmVjID0gdmVjO1xuLyoqXG4gKiBGdW5jdGlvbiByZXR1cm5pbmcgdGhlIEphcm8gc2NvcmUgYmV0d2VlbiB0d28gc2VxdWVuY2VzLlxuICpcbiAqIEBwYXJhbSAge21peGVkfSAgYSAgICAgLSBUaGUgZmlyc3Qgc2VxdWVuY2UuXG4gKiBAcGFyYW0gIHttaXhlZH0gIGIgICAgIC0gVGhlIHNlY29uZCBzZXF1ZW5jZS5cbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgLSBUaGUgSmFybyBzY29yZSBiZXR3ZWVuIGEgJiBiLlxuICovXG5mdW5jdGlvbiB0YWxpc21hbl9qYXJvKGEsIGIpIHtcbiAgICAvLyBGYXN0IGJyZWFrXG4gICAgaWYgKGEgPT09IGIpXG4gICAgICAgIHJldHVybiAxO1xuICAgIHZhciBtYXgsIG1pbjtcbiAgICBpZiAoYS5sZW5ndGggPiBiLmxlbmd0aCkge1xuICAgICAgICBtYXggPSBhO1xuICAgICAgICBtaW4gPSBiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbWF4ID0gYjtcbiAgICAgICAgbWluID0gYTtcbiAgICB9XG4gICAgLy8gRmluZGluZyBtYXRjaGVzXG4gICAgdmFyIHJhbmdlID0gTWF0aC5tYXgoKChtYXgubGVuZ3RoIC8gMikgfCAwKSAtIDEsIDApLCBpbmRleGVzID0gdmVjKG1pbi5sZW5ndGgsIC0xKSwgZmxhZ3MgPSB2ZWMobWF4Lmxlbmd0aCwgZmFsc2UpO1xuICAgIHZhciBtYXRjaGVzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1pbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IG1pbltpXSwgeGkgPSBNYXRoLm1heChpIC0gcmFuZ2UsIDApLCB4biA9IE1hdGgubWluKGkgKyByYW5nZSArIDEsIG1heC5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBqID0geGksIG1fMSA9IHhuOyBqIDwgbV8xOyBqKyspIHtcbiAgICAgICAgICAgIGlmICghZmxhZ3Nbal0gJiYgY2hhcmFjdGVyID09PSBtYXhbal0pIHtcbiAgICAgICAgICAgICAgICBpbmRleGVzW2ldID0gajtcbiAgICAgICAgICAgICAgICBmbGFnc1tqXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBtczEgPSBuZXcgQXJyYXkobWF0Y2hlcyksIG1zMiA9IG5ldyBBcnJheShtYXRjaGVzKTtcbiAgICB2YXIgc2k7XG4gICAgc2kgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbWluLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoaW5kZXhlc1tpXSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1zMVtzaV0gPSBtaW5baV07XG4gICAgICAgICAgICBzaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNpID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1heC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGZsYWdzW2ldKSB7XG4gICAgICAgICAgICBtczJbc2ldID0gbWF4W2ldO1xuICAgICAgICAgICAgc2krKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgdHJhbnNwb3NpdGlvbnMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbXMxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAobXMxW2ldICE9PSBtczJbaV0pXG4gICAgICAgICAgICB0cmFuc3Bvc2l0aW9ucysrO1xuICAgIH1cbiAgICAvLyBDb21wdXRpbmcgdGhlIGRpc3RhbmNlXG4gICAgaWYgKCFtYXRjaGVzKVxuICAgICAgICByZXR1cm4gMDtcbiAgICB2YXIgdCA9ICh0cmFuc3Bvc2l0aW9ucyAvIDIpIHwgMCwgbSA9IG1hdGNoZXM7XG4gICAgcmV0dXJuICgobSAvIGEubGVuZ3RoKSArIChtIC8gYi5sZW5ndGgpICsgKChtIC0gdCkgLyBtKSkgLyAzO1xufVxuZXhwb3J0cy50YWxpc21hbl9qYXJvID0gdGFsaXNtYW5famFybztcbi8qKlxuICogSmFybyBkaXN0YW5jZSBpcyAxIC0gdGhlIEphcm8gc2NvcmUuXG4gKi9cbi8vY29uc3QgZGlzdGFuY2UgPSAoYSwgYikgPT4gMSAtIGphcm8oYSwgYik7XG4vKipcbiAqIFRhbGlzbWFuIG1ldHJpY3MvZGlzdGFuY2UvamFyby13aW5rbGVyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqXG4gKiBGdW5jdGlvbiBjb21wdXRpbmcgdGhlIEphcm8tV2lua2xlciBzY29yZS5cbiAqXG4gKiBbUmVmZXJlbmNlXTpcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0phcm8lRTIlODAlOTNXaW5rbGVyX2Rpc3RhbmNlXG4gKlxuICogW0FydGljbGVdOlxuICogV2lua2xlciwgVy4gRS4gKDE5OTApLiBcIlN0cmluZyBDb21wYXJhdG9yIE1ldHJpY3MgYW5kIEVuaGFuY2VkIERlY2lzaW9uIFJ1bGVzXG4gKiBpbiB0aGUgRmVsbGVnaS1TdW50ZXIgTW9kZWwgb2YgUmVjb3JkIExpbmthZ2VcIi5cbiAqIFByb2NlZWRpbmdzIG9mIHRoZSBTZWN0aW9uIG9uIFN1cnZleSBSZXNlYXJjaCBNZXRob2RzXG4gKiAoQW1lcmljYW4gU3RhdGlzdGljYWwgQXNzb2NpYXRpb24pOiAzNTTigJMzNTkuXG4gKlxuICogW1RhZ3NdOiBzZW1pbWV0cmljLCBzdHJpbmcgbWV0cmljLlxuICovXG4vKipcbiAqIEphcm8tV2lua2xlciBzdGFuZGFyZCBmdW5jdGlvbi5cbiAqL1xuLy9leHBvcnQgY29uc3QgamFyb1dpbmtsZXIgPSBjdXN0b21KYXJvV2lua2xlci5iaW5kKG51bGwsIG51bGwpO1xuLyoqXG4gKiBKYXJvLVdpbmtsZXIgZGlzdGFuY2UgaXMgMSAtIHRoZSBKYXJvLVdpbmtsZXIgc2NvcmUuXG4gKi9cbi8vY29uc3QgZGlzdGFuY2UgPSAoYSwgYikgPT4gMSAtIGphcm9XaW5rbGVyKGEsIGIpO1xuLyoqXG4gKiBFeHBvcnRpbmcuXG4gKi9cbi8vIENvbXB1dGVzIHRoZSBXaW5rbGVyIGRpc3RhbmNlIGJldHdlZW4gdHdvIHN0cmluZyAtLSBpbnRyZXByZXRlZCBmcm9tOlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9KYXJvJUUyJTgwJTkzV2lua2xlcl9kaXN0YW5jZVxuLy8gczEgaXMgdGhlIGZpcnN0IHN0cmluZyB0byBjb21wYXJlXG4vLyBzMiBpcyB0aGUgc2Vjb25kIHN0cmluZyB0byBjb21wYXJlXG4vLyBkaiBpcyB0aGUgSmFybyBEaXN0YW5jZSAoaWYgeW91J3ZlIGFscmVhZHkgY29tcHV0ZWQgaXQpLCBsZWF2ZSBibGFuayBhbmQgdGhlIG1ldGhvZCBoYW5kbGVzIGl0XG5mdW5jdGlvbiBqYXJvV2lua2xlckRpc3RhbmNlKHMxLCBzMikge1xuICAgIGlmIChzMSA9PSBzMikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBqYXJvID0gdGFsaXNtYW5famFybyhzMSwgczIpO1xuICAgICAgICB2YXIgcCA9IDAuMTsgLy9cbiAgICAgICAgdmFyIGwgPSAwOyAvLyBsZW5ndGggb2YgdGhlIG1hdGNoaW5nIHByZWZpeFxuICAgICAgICB3aGlsZSAoczFbbF0gPT0gczJbbF0gJiYgbCA8IDQpXG4gICAgICAgICAgICBsKys7XG4gICAgICAgIHJldHVybiBqYXJvICsgbCAqIHAgKiAoMSAtIGphcm8pO1xuICAgIH1cbn1cbmV4cG9ydHMuamFyb1dpbmtsZXJEaXN0YW5jZSA9IGphcm9XaW5rbGVyRGlzdGFuY2U7XG4vKlxuXHJcbmZ1bmN0aW9uIGNudENoYXJzKHN0ciA6IHN0cmluZywgbGVuIDogbnVtYmVyKSB7XG4gIHZhciBjbnQgPSAwO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBjbnQgKz0gKHN0ci5jaGFyQXQoaSkgPT09ICdYJyk/IDEgOiAwO1xuICB9XG4gIHJldHVybiBjbnQ7XG59XG4qL1xuLyoqXG4gKiBAcGFyYW0gc1RleHQge3N0cmluZ30gdGhlIHRleHQgdG8gbWF0Y2ggdG8gTmF2VGFyZ2V0UmVzb2x1dGlvblxuICogQHBhcmFtIHNUZXh0MiB7c3RyaW5nfSB0aGUgcXVlcnkgdGV4dCwgZS5nLiBOYXZUYXJnZXRcbiAqXG4gKiBAcmV0dXJuIHRoZSBkaXN0YW5jZSwgbm90ZSB0aGF0IGlzIGlzICpub3QqIHN5bW1ldHJpYyFcbiAqL1xuZnVuY3Rpb24gY2FsY0Rpc3RhbmNlKHNUZXh0MSwgc1RleHQyKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJsZW5ndGgyXCIgKyBzVGV4dDEgKyBcIiAtIFwiICsgc1RleHQyKVxuICAgIHZhciBzMWxlbiA9IHNUZXh0MS5sZW5ndGg7XG4gICAgdmFyIHMybGVuID0gc1RleHQyLmxlbmd0aDtcbiAgICB2YXIgbWluID0gTWF0aC5taW4oczFsZW4sIHMybGVuKTtcbiAgICBpZiAoTWF0aC5hYnMoczFsZW4gLSBzMmxlbikgPiBtaW4pIHtcbiAgICAgICAgcmV0dXJuIDAuMztcbiAgICB9XG4gICAgdmFyIGRpc3QgPSBqYXJvV2lua2xlckRpc3RhbmNlKHNUZXh0MSwgc1RleHQyKTtcbiAgICAvKlxuICAgIHZhciBjbnQxID0gY250Q2hhcnMoc1RleHQxLCBzMWxlbik7XG4gICAgdmFyIGNudDIgPSBjbnRDaGFycyhzVGV4dDIsIHMybGVuKTtcbiAgICBpZihjbnQxICE9PSBjbnQyKSB7XG4gICAgICBkaXN0ID0gZGlzdCAqIDAuNztcbiAgICB9XG4gICAgKi9cbiAgICByZXR1cm4gZGlzdDtcbiAgICAvKlxuICAgIHZhciBhMCA9IGRpc3RhbmNlLmxldmVuc2h0ZWluKHNUZXh0MS5zdWJzdHJpbmcoMCwgc1RleHQyLmxlbmd0aCksIHNUZXh0MilcbiAgICBpZihkZWJ1Z2xvZ1YuZW5hYmxlZCkge1xuICAgICAgZGVidWdsb2dWKFwiZGlzdGFuY2VcIiArIGEwICsgXCJzdHJpcHBlZD5cIiArIHNUZXh0MS5zdWJzdHJpbmcoMCxzVGV4dDIubGVuZ3RoKSArIFwiPD5cIiArIHNUZXh0MisgXCI8XCIpO1xuICAgIH1cbiAgICBpZihhMCAqIDUwID4gMTUgKiBzVGV4dDIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiA0MDAwMDtcbiAgICB9XG4gICAgdmFyIGEgPSBkaXN0YW5jZS5sZXZlbnNodGVpbihzVGV4dDEsIHNUZXh0MilcbiAgICByZXR1cm4gYTAgKiA1MDAgLyBzVGV4dDIubGVuZ3RoICsgYVxuICAgICovXG59XG5leHBvcnRzLmNhbGNEaXN0YW5jZSA9IGNhbGNEaXN0YW5jZTtcbi8qXG52YXIgZmFjQWRqdXN0RGlzdGFuY2UgPSBbXTtcbnZhciB1ID0gXCJhXCI7XG5mb3IodmFyIGkgPSAyOyBpIDwgMTU7ICsraSkge1xuICB2YXIgdW4gPSB1ICsgU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIGkgKyAxICk7XG4gIGNvbnNvbGUubG9nKHVuKTtcbiAgZmFjQWRqdXN0RGlzdGFuY2VbdS5sZW5ndGhdID0gKDEtMC45ODAxMDAwKS8gKDEuMCAtIGNhbGNEaXN0YW5jZSh1LHVuKSk7XG4gIHUgPSB1bjtcbn1cblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY0Rpc3RhbmNlQWRqdXN0ZWQyKGE6IHN0cmluZywgYjpzdHJpbmcpIDogbnVtYmVyIHtcbiAgdmFyIGRpc3QgPSBjYWxjRGlzdGFuY2UoYSxiKTtcbiAgdmFyIG1sID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgaWYoZGlzdCA8IDEuMCAmJiAobWwgPCAxNSkgJiYgIChtbCA+IDIpKSB7XG4gICAgICByZXR1cm4gMS4wICAtICAoMS4wLSBkaXN0KSAqIGZhY0FkanVzdERpc3RhbmNlW21sXTtcbiAgfVxuICByZXR1cm4gZGlzdDtcbn1cbiovXG4vKipcbiAqIFRoZSBhZGp1c3RtZW50IGlzIGNob3NlbiBpbiB0aGUgZm9sbG93aW5nIHdheSxcbiAqIGEgc2luZ2xlIFwiYWRkZWRcIiBjaGFyYWN0ZXIgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nIGZpdHNcbiAqIGlzIFwibGlmdGVkIGF0IGxlbmd0aCA1XCIgdG8gMC45OFxuICogICAxLjY2NSA9ICAoIDEgLSBjYWxjRGlzdGFuY2UoJ2FiY2RlJywnYWJjZGVfJykpIC8gMC45OFxuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyBzbW9vdGhseSB0byBtZXJnZSBhdCBsZW5ndGggMjA7XG4gKiAgIGZhYyA9KCgyMC1sZW4pLygxNSkpKjAuNjY1ICsxXG4gKiAgIHJlcyA9IDEtICgxLWQpL2ZhYztcbiAqL1xuZnVuY3Rpb24gY2FsY0Rpc3RhbmNlQWRqdXN0ZWQoYSwgYikge1xuICAgIHZhciBkaXN0ID0gY2FsY0Rpc3RhbmNlKGEsIGIpO1xuICAgIHZhciBtbCA9IE1hdGgubWluKGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gICAgaWYgKGRpc3QgPCAxLjAgJiYgKG1sIDwgMjApKSB7XG4gICAgICAgIHZhciBmYWMgPSAxICsgKDAuNjY1IC8gMTUuMCkgKiAoMjAgLSBtbCk7XG4gICAgICAgIHJldHVybiAxLjAgLSAoMS4wIC0gZGlzdCkgLyBmYWM7XG4gICAgfVxuICAgIHJldHVybiBkaXN0O1xufVxuZXhwb3J0cy5jYWxjRGlzdGFuY2VBZGp1c3RlZCA9IGNhbGNEaXN0YW5jZUFkanVzdGVkO1xuLypcblxyXG5mdW5jdGlvbiBnZXRDaGFyQXQoc3RyLCBuKSB7XG4gIGlmKHN0ci5sZW5ndGggPiBuKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQobik7XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXHJcbmZ1bmN0aW9uIGdldEhlYWQoc3RyLHUpIHtcbiAgdSA9IE1hdGgubWluKHN0ci5sZW5ndGgsIHUpO1xuICB1ID0gTWF0aC5tYXgoMCx1KTtcbiAgcmV0dXJuIHN0ci5zdWJzdHJpbmcoMCx1KTtcbn1cblxyXG5mdW5jdGlvbiBnZXRUYWlsKHN0cixwKSB7XG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKHApO1xufVxuXHJcbnZhciBzdHJzID0gW1wiQVwiXTtcbnZhciB1ID0gXCJBXCI7XG5mb3IodmFyIGkgPSAxOyBpIDwgMjU7ICsraSkge1xuICB2YXIgdW4gPSB1ICsgU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIGkgKTtcbiAgc3Ryc1t1bi5sZW5ndGgtMV0gPSB1bjtcbiAgY29uc29sZS5sb2codW4pO1xuICBmYWNBZGp1c3REaXN0YW5jZVt1Lmxlbmd0aF0gPSAoMS0wLjk4MDEwMDApLyAoMS4wIC0gY2FsY0Rpc3RhbmNlKHUsdW4pKTtcbiAgdSA9IHVuO1xufVxuXHJcbnZhciByZXMgPSBbXTtcblxyXG52YXIgcmVzMiA9IFtdO1xuZm9yKHZhciBpID0gMTsgaSA8IHN0cnMubGVuZ3RoOyArK2kpIHtcbiAgdmFyIHN0ciA9IHN0cnNbaV07XG4gIHZhciBuYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJ2EnLmNoYXJDb2RlQXQoMCkgKyAyKmkgKyAyICk7XG4gIHZhciBuYyA9ICdfJztcbiAgdmFyIGFkZFRhaWwgPSBzdHIgICsgbmM7XG4gIHZhciBhZGRGcm9udCA9IG5jICsgc3RyO1xuICB2YXIgbmMyID0gJy8nOyAvL1N0cmluZy5mcm9tQ2hhckNvZGUoJ2EnLmNoYXJDb2RlQXQoMCkgKyAyKmkgKyAzICk7XG5cclxuICB2YXIgZGlmZk1pZCA9IGdldEhlYWQoc3RyLE1hdGguZmxvb3Ioc3RyLmxlbmd0aC8yKSkgICsgbmMgICsgZ2V0VGFpbChzdHIsIE1hdGguZmxvb3Ioc3RyLmxlbmd0aC8yKSsxKTtcbiAgdmFyIGRpZmZNaWQyID0gc3Ryc1tpXS5zdWJzdHJpbmcoMCwgTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpLTEpICsgbmMgKyBuYzIgKyBnZXRUYWlsKHN0cixNYXRoLmZsb29yKHN0ci5sZW5ndGgvMikrMSk7XG4gIHZhciBkaWZmRW5kID0gc3Ryc1tpXS5zdWJzdHJpbmcoMCwgc3Ryc1tpXS5sZW5ndGggLSAxKSArIG5jO1xuICB2YXIgZGlmZlN0YXJ0ID0gbmMgKyBzdHJzW2ldLnN1YnN0cmluZygxKTtcbiAgdmFyIHN3YXBGcm9udCA9IHN0ci5zdWJzdHJpbmcoMCwyKSArIGdldENoYXJBdChzdHIsMykgKyBnZXRDaGFyQXQoc3RyLDIpICsgc3RyLnN1YnN0cmluZyg0KTtcbiAgdmFyIHN3YXBNaWQgPSBnZXRIZWFkKHN0ciwgTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpLTEpICArIGdldENoYXJBdChzdHIsTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpKSArIGdldENoYXJBdChzdHIsTWF0aC5mbG9vcihzdHIubGVuZ3RoLzIpLTEpICArIGdldFRhaWwoc3RyLE1hdGguZmxvb3Ioc3RyLmxlbmd0aC8yKSsxKTtcbiAgdmFyIHN3YXBFbmQgPSBnZXRIZWFkKHN0ciwgc3RyLmxlbmd0aCAtIDIpICsgZ2V0Q2hhckF0KHN0cixzdHIubGVuZ3RoLTEpICsgZ2V0Q2hhckF0KHN0cixzdHIubGVuZ3RoLTIpO1xuXHJcbiAgdmFyIHIgPSBbZGlmZlN0YXJ0LCBkaWZmTWlkLCBkaWZmRW5kLCBhZGRGcm9udCwgYWRkVGFpbCwgZGlmZk1pZDIsIHN3YXBGcm9udCwgc3dhcE1pZCwgc3dhcEVuZCBdO1xuICBjb25zb2xlLmxvZygnKioqKlxcbicgKyBzdHIgKydcXG4nICsgci5qb2luKFwiXFxuXCIpKTtcbiAgaWYoIGkgPT09IDEpIHtcbiAgICByZXMucHVzaChgaVxcdGRpZmZTdGFydFxcdGRpZmZNaWRcXHRkaWZmRW5kXFx0YWRkRnJvbnRcXHRhZGRUYWlsXFx0ZGlmZk1pZDJcXHRzd2FwRnJvbnRcXHRzd2FwTWlkXFx0c3dhcEVuZFxcbmApO1xuICAgIHJlczIucHVzaChgaVxcdGRpZmZTdGFydFxcdGRpZmZNaWRcXHRkaWZmRW5kXFx0YWRkRnJvbnRcXHRhZGRUYWlsXFx0ZGlmZk1pZDJcXHRzd2FwRnJvbnRcXHRzd2FwTWlkXFx0c3dhcEVuZFxcbmApO1xuICB9XG4gIHJlcy5wdXNoKGAke3N0ci5sZW5ndGh9XFx0YCArIHIubWFwKHMgPT4gY2FsY0Rpc3RhbmNlKHN0cixzKS50b0ZpeGVkKDQpKS5qb2luKFwiXFx0XCIpICsgJ1xcbicpO1xuICByZXMyLnB1c2goYCR7c3RyLmxlbmd0aH1cXHRgICsgci5tYXAocyA9PiBjYWxjRGlzdGFuY2VBZGp1c3RlZChzdHIscykudG9GaXhlZCg0KSkuam9pbihcIlxcdFwiKSArICdcXG4nKTtcbn1cblxyXG5cclxuY29uc29sZS5sb2cocmVzLmpvaW4oJycpKTtcblxyXG5jb25zb2xlLmxvZygnLS0tJyk7XG5jb25zb2xlLmxvZyhyZXMyLmpvaW4oJycpKTtcblxyXG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuZnMud3JpdGVGaWxlU3luYygnbGV2ZW4udHh0JywgcmVzLmpvaW4oJycpICsgJ1xcbicgKyByZXMyLmpvaW4oJycpKTtcblxyXG4qL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
