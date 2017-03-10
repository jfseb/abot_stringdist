'use strict';
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
        for (var i = 0; i < n; i++)
            vector[i] = fill;
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
    if (a === b)
        return 1;
    var max, min;
    if (a.length > b.length) {
        max = a;
        min = b;
    }
    else {
        max = b;
        min = a;
    }
    // Finding matches
    var range = Math.max(((max.length / 2) | 0) - 1, 0), indexes = vec(min.length, -1), flags = vec(max.length, false);
    var matches = 0;
    for (var i = 0, l = min.length; i < l; i++) {
        var character = min[i], xi = Math.max(i - range, 0), xn = Math.min(i + range + 1, max.length);
        for (var j = xi, m_1 = xn; j < m_1; j++) {
            if (!flags[j] && character === max[j]) {
                indexes[i] = j;
                flags[j] = true;
                matches++;
                break;
            }
        }
    }
    var ms1 = new Array(matches), ms2 = new Array(matches);
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
        if (ms1[i] !== ms2[i])
            transpositions++;
    }
    // Computing the distance
    if (!matches)
        return 0;
    var t = (transpositions / 2) | 0, m = matches;
    return ((m / a.length) + (m / b.length) + ((m - t) / m)) / 3;
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
    }
    else {
        var jaro = talisman_jaro(s1, s2);
        var p = 0.1; //
        var l = 0; // length of the matching prefix
        while (s1[l] == s2[l] && l < 4)
            l++;
        return jaro + l * p * (1 - jaro);
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
    if (dist < 1.0 && (ml < 20)) {
        var fac = 1 + (0.665 / 15.0) * (20 - ml);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBO0FBRVosK0ZBQStGO0FBQy9GLDBFQUEwRTtBQUcxRTs7O0dBR0c7QUFFSDs7Ozs7Ozs7R0FRRztBQUdIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXFERTtBQUVGOzs7OztFQUtFO0FBR0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTZDRTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF5R0U7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBR0g7Ozs7Ozs7R0FPRztBQUNILGFBQW9CLENBQUMsRUFBRSxJQUFJO0lBQ3pCLElBQU0sTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDeEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBUmUsV0FBRyxNQVFsQixDQUFBO0FBR0Q7Ozs7OztHQU1HO0FBQ0gsdUJBQThCLENBQUMsRUFBRSxDQUFDO0lBQ2hDLGFBQWE7SUFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ1YsTUFBTSxDQUFDLENBQUMsQ0FB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