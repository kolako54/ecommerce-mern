export const ImageUpload = async (images) => {
    console.log('mediaaaaaa22222')
    let imgArr = [];
    for (const item of images) {
        console.log('mediaaaaaa33333333')

        const formData = new FormData();
        formData.append('file', item);
        formData.append('upload_preset', process.env.CLOUD_UPDATE_PRESET)
        formData.append('cloud_name', process.env.CLOUD_NAME)
        const res = await fetch('https://api.cloudinary.com/v1_1/dishclu5i/image/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url })

    }
    return imgArr;

}
