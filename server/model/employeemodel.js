import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmployeeSchema=new Schema({
    id: { type: Number, index: true, required: true },
    firstName:String,
    lastName:String,
    age:Number,
    dateOfJoining: { 
        type: Date, 
        required: true,
        get: (date) => {
          // Format the date as yyyy-mm-dd
          return date.toISOString().split('T')[0];
        },
        set: (date) => {
          // Ensure the date is in the correct format
          return new Date(date);
        }
      },
    title:String,
    department:String,
    employeeType:String,
    currentStatus:String
},
{
  statics: {
    async getMaxId() {
      const issue = await this.findOne({}).sort({ id: -1 });
      return issue?.id || 0;
    }
  }
}
)

export const Employee = mongoose.model("employee", EmployeeSchema);
