import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'


const videoSchema = new Schema(
    {
        videoFile: {
            type: String,  //cloudinary se
            required: true 
        },
        thumbnail: {
            type: String,  //cloudinary se
            required : true
        },
        title: {
            type:String,
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, //cloudinary hi time bhejta hai
            required: true
        },
        views: {
            type: Number,
            default : 0
        },
        isPublished: {   //chize public hai ki nahi
            type: Boolean,
            default: ture
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps: true,
    }
)


videoSchema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("Video", videoSchema)
