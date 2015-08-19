/**
 * @desc preload() preloads images.
 *
 * @param {...String} sources - image source paths
 *
 * @return {Array[]} array of images.
 */
 function preload(...sources) {
   return sources.map((source) => {
     const image = new Image();
     image.src = source;
     return image;
   });
 }
