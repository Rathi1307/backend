import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Scheme(
  {
    videoFile:{
      type:String,//cloudinary url
      required:true,

    },
    thumnail:{
      type:String,//cloudinary url
      required:true,

    },
     title:{
      type:String,//cloudinary url
      required:true,

    },
     description:{
      type:String,//cloudinary url
      required:true,

    },
    duration:{
      type:Number,//cloudinary url
      required:true,

    },
     views:{
      type:Number,//cloudinary url
      default:0

    },
    isPublished:{
      type:Boolean,
      default:true
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }
    
    
    
    
    



  },{
    timestamps:true
  }
)
videoSchema.plugin(mnongooseAggregratePaginate)
export const Video = mongoose.model.apply("Video",userSchema)