const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
 
const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');
 
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}
 
fs.readdirSync(target)
    .forEach(image => {
        const extension = path.extname(image);
        if (extension) {
            // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
            sharp(`${target}/${image}`)
                .resize(800)
                .toFile(path.resolve(
                    __dirname,
                    `${destination}/${image.split('.').slice(0, -1).join('.')}-large${extension == 'svg' ? 'png' : extension}`),
                );

            // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
            sharp(`${target}/${image}`)
                .resize(480)
                .toFile(path.resolve(
                    __dirname,
                    `${destination}/${image.split('.').slice(0, -1).join('.')}-small${extension == 'svg' ? 'png' : extension}`),
                );
        } else {
            fs.readdirSync(`${target}/${image}`)
            .forEach(subImage => {
                const extensionSubImage = path.extname(subImage);
                // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
                sharp(`${target}/${image}/${subImage}`)
                    .resize(800)
                    .toFile(path.resolve(
                        __dirname,
                        `${destination}/${subImage.split('.').slice(0, -1).join('.')}-large${extensionSubImage == 'svg' ? 'png' : extensionSubImage}`),
                    );
    
                // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
                sharp(`${target}/${image}/${subImage}`)
                    .resize(480)
                    .toFile(path.resolve(
                        __dirname,
                        `${destination}/${subImage.split('.').slice(0, -1).join('.')}-small${extensionSubImage == 'svg' ? 'png' : extensionSubImage}`),
                    );
            })
        }
    });