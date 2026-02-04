//it gives all the protocols should be followed in requests like post
//request parameters includes user name ,id, age etc
export const createValidationSchema = {
    name:{
        notEmpty:{
            errorMessage:"prod name should not be empty"
        }
    },
        rate:{
            notEmpty:{
            errorMessage:"prod name should not be empty"
        }
        }
    }

export const studentSchema = {
    name:{
        notEmpty:{
            errorMessage:"stu name should not be empty"
        }
    },
        dept:{
            notEmpty:{
            errorMessage:"dept name should not be empty"
        }
        },
        password:{
            notEmpty:{
                errorMessage:"pwd mustnt be empty"
            }
        }
    }

