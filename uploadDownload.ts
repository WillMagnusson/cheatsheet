const getFile = async () => {
        //mock id
        const id = '05ca12fd-8559-4bd1-b4ee-125ddf1cfe89';
        //some fetch call
        return await filesRepo.getAttachmentPackage(res.id, fileName);
      };

getPlugin().then(async (file) => {
        if (file) {
          const buffer = file.arrayBuffer();
          //use JSZip package to get Zip file from Blob
          const zip = await JSZip.loadAsync(buffer);
          //get list of files and filter out unneeded stuff
          await Promise.all(
            Object.keys(zip.files).map(async (relativePath) => {
              const fileEntry = zip.files[relativePath];
              const content = await fileEntry.async('blob');
              if (
                !relativePath.includes('__MACOSX') &&
                !relativePath.includes('.DS_Store') &&
                content.size > 0
              ) {
                //Add files with text content and name to list, 
                //these can them be stringified to pass along to server call
                extractedFiles.push({
                  name: relativePath,
                  content: await content.text(),
                });
              }
            }),
          );
        }
      }
