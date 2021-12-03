const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createAt:{
            type: Date,
            default: Date.now
        },
        username:{
            type: String,
            required: true
        },
        reactions:[reactionSchema]
    },
    {
        toJSON:{
            virtuals: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})