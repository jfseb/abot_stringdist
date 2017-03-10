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
export declare function vec(n: any, fill: any): any[];
/**
 * Function returning the Jaro score between two sequences.
 *
 * @param  {mixed}  a     - The first sequence.
 * @param  {mixed}  b     - The second sequence.
 * @return {number}       - The Jaro score between a & b.
 */
export declare function talisman_jaro(a: any, b: any): number;
/**
 * Jaro distance is 1 - the Jaro score.
 */
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
/**
 * Jaro-Winkler distance is 1 - the Jaro-Winkler score.
 */
/**
 * Exporting.
 */
export declare function jaroWinklerDistance(s1: string, s2: string): number;
/**
 * @param sText {string} the text to match to NavTargetResolution
 * @param sText2 {string} the query text, e.g. NavTarget
 *
 * @return the distance, note that is is *not* symmetric!
 */
export declare function calcDistance(sText1: string, sText2: string): number;
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
export declare function calcDistanceAdjusted(a: string, b: string): number;
