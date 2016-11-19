Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});

export const ImagesCol = Images;
