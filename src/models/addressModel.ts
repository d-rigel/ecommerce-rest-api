import { Schema, model } from "mongoose";

export interface IAddress {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: string,
    phone: string,
    address: {
        street: string,
        city: string,
        township: string,        
    }
}

const addressSchema: Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        township: {
            type: String,
            required: true
        }
    }    
});

const Address = model<IAddress>('Address', addressSchema);
export default Address;