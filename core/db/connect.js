import mongoose from 'mongoose'

export default async (uri) => {
   return  mongoose.connect(uri).then(() => {
      console.log('D B Connected')

      mongoose.set('toJSON', {
         virtuals: true,
         transform: (doc, converted) => {
            delete converted._id;
            delete converted.__v;
         }
      })
   })
}
