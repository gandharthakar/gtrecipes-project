
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SiteUserModel = require("../mongodb/models/siteUsers.js");
const recipeCategoriesModel = require("../mongodb/models/recipeCategories.js");

const resolvers = {
    Query: {
        getUserPhotoAndName: async (parent, args) => {
            // console.log(args);
            let respdata = {
                user_name: '',
                user_photo: '',
                ripp: 0,
                cipp: 0
            };
            try {
                const user = await SiteUserModel.findOne({_id: args.id});
                if(user) {
                    let cipp_c = await recipeCategoriesModel.find({recipe_category_author_id: args.id})
                    respdata = {
                        user_name: user.user_full_name,
                        user_photo: user.user_profile_photo,
                        ripp: 0,
                        cipp: cipp_c.length
                    };
                }
            } catch (error) {
                console.log(error.message);
            }
            return respdata;
        },
        getGeneralSettings: async (parent, args) => {
            let respdata = {
                user_name: '',
                user_email: '',
                ripp: 0,
                cipp: 0
            };
            try {
                const user = await SiteUserModel.findOne({_id: args.id});
                if(user) {
                    respdata = {
                        user_name: user.user_full_name,
                        user_email: user.user_email,
                        ripp: user.user_recipe_items_per_page,
                        cipp: user.user_categories_items_per_page
                    };
                }
            } catch (error) {
                console.log(error.message);
            }
            return respdata;
        },
        getProfilePicture: async (parent, args) => {
            let respdata = {
                user_photo: ''
            };
            try {
                const user = await SiteUserModel.findOne({_id: args.id});
                if(user) {
                    respdata = {
                        user_photo: user.user_profile_photo
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
            return respdata;
        },
        getAllRecipeCategories: async (parent, args) => {
            // console.log(args);
            let { id } = args;
            let data = [];
            try {
                const user = await recipeCategoriesModel.find({recipe_category_author_id: id});
                if(user.length > 0) {
                    await user.forEach( async (usr, idx) => {
                        let obj = {
                            id: usr._id.toString(),
                            category_name: usr.recipe_category_name,
                            category_slug: usr.recipe_category_slug,
                            category_auth_id: usr.recipe_category_author_id,
                            category_auth_name: usr.recipe_category_author_name
                        }
                        await data.push(obj);
                    });
                } else {
                    data = [];
                }
            } catch (error) {
                console.log(error.message);
                data = [];
            }
            // console.log(data);
            return data;
        }
    },
    Mutation: {
        registerNewUser: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: "Registered Successfully.",
                success: true
            }
            let { full_name, email, password, confirm_password } = args;

            const user = await SiteUserModel.findOne({user_email: email})
            if(user) {
                frm_status = {
                    message: "User Already Exist",
                    success: false
                }
            } else {
                if(full_name && email && password && confirm_password) {
                    if(password === confirm_password) {
                        try {
                            const salt = await bcrypt.genSalt(10);
                            const hashPwd = await bcrypt.hash(password, salt);
                            // console.log(hashPwd);
                            const doc = new SiteUserModel({
                                user_full_name: full_name, 
                                user_email: email, 
                                user_profile_photo: '', 
                                user_password: hashPwd,
                                user_recipe_items_per_page: 6,
                                user_categories_items_per_page: 6
                            });
                            await doc.save();
                        } catch (error) {
                            console.log(error.message);
                            frm_status = {
                                message: "Unable To register",
                                success: false
                            }
                        }
                    } else {
                        frm_status = {
                            message: "Password & Confirm Password Doesn't Match.",
                            success: false
                        }
                    }
                } else {
                    frm_status = {
                        message: "Missing Required Field",
                        success: false
                    }
                }
            }
            return frm_status;
        },
        loginUser: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: "Login Successfully.",
                success: true,
                token: '',
                user_id: '',
                user_name: '',
            }
            let { email, password } = args;
            const user = await SiteUserModel.findOne({user_email: email})
            if(user) {
                if(email && password) {
                    try {
                        const isMatch = await bcrypt.compare(password, user.user_password);
                        if((user.user_email === email) && isMatch) {
                            const saved_user = await SiteUserModel.findOne({user_email: email});
                            const token_l = jwt.sign({userID: saved_user._id}, process.env.JWT_SEC, { expiresIn: '30d' });
                            frm_status = {
                                message: "Login Successfully.",
                                success: true,
                                token: token_l,
                                user_id: saved_user._id,
                                user_name: saved_user.user_full_name,
                            }
                        } else {
                            frm_status = {
                                message: "Email or Password is not valid.",
                                success: false,
                                token: '',
                                user_id: '',
                                user_name: '',
                            }
                        }
                    } catch (error) {
                        console.log(error.message);
                        frm_status = {
                            message: "Unable To login",
                            success: false,
                            token: '',
                            user_id: '',
                            user_name: '',
                        }
                    }
                } else {
                    frm_status = {
                        message: "Missing Required Field",
                        success: false,
                        token: '',
                        user_id: '',
                        user_name: '',
                    }
                }
            } else {
                frm_status = {
                    message: "User Account Not Found. Please Register First.",
                    success: false,
                    token: '',
                    user_id: '',
                    user_name: '',
                }

            }
            return frm_status;
        },
        updateGeneralSettings: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let {id, user_name, user_email, ripp, cipp} = args;
            const user = await SiteUserModel.findOne({_id: id});
            if(user) {
                if(user_name && user_email && ripp && cipp) {
                    try {
                        await SiteUserModel.findOneAndUpdate({_id: id}, {
                            user_full_name: user_name,
                            user_email,
                            user_recipe_items_per_page: ripp,
                            user_categories_items_per_page: cipp
                        }, {
                            new: true
                        });
                        frm_status = {
                            message: "User Updated Successfully!",
                            success: true
                        }
                        let cats = await recipeCategoriesModel.find({recipe_category_author_id: id})
                        // console.log(cats);
                        if(cats.length > 0) {
                            await recipeCategoriesModel.updateMany({recipe_category_author_id: id}, {
                                recipe_category_author_name: user_name
                            });
                        }
                    } catch (error) {
                        console.log(error.message);
                        frm_status = {
                            message: "Unable To Update User General Settings.",
                            success: false
                        }
                    }
                } else {
                    frm_status = {
                        message: "Missing Required Field",
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: "User Not Exist",
                    success: false
                }
            }
            return frm_status;
        },
        updatePassword: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let {id, password, confirm_password} = args;
            const user = await SiteUserModel.findOne({_id: id});
            if(user) {
                if(password && confirm_password) {
                    if(password === confirm_password) {
                        try {
                            const salt = await bcrypt.genSalt(10);
                            const hashPwd = await bcrypt.hash(password, salt);
                            await SiteUserModel.findOneAndUpdate({_id: id}, {
                                user_password: hashPwd
                            }, {
                                new: true
                            });
                            frm_status = {
                                message: "Password Updated Successfully!",
                                success: true
                            }
                        } catch (error) {
                            console.log(error.message);
                            frm_status = {
                                message: "Unable To Update User Password.",
                                success: false
                            }
                        }

                    } else {
                        frm_status = {
                            message: "Password & Confirm Password Doesn't Match.",
                            success: false
                        }
                    }
                } else {
                    frm_status = {
                        message: "Missing Required Field.",
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: "User Not Exist.",
                    success: false
                }
            }
            return frm_status;
        },
        updateProfilePicture: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let {id, user_photo} = args;
            const user = await SiteUserModel.findOne({_id: id});
            if(user) {
                try {
                    await SiteUserModel.findOneAndUpdate({_id: id}, {
                        user_profile_photo: user_photo
                    }, {
                        new: true
                    });
                    frm_status = {
                        message: "Profile Photo Updated Successfully!",
                        success: true
                    }
                } catch (error) {
                    console.log(error.message);
                    frm_status = {
                        message: "Unable To Update User Profile Photo.",
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: "User Not Exist",
                    success: false
                }
            }
            return frm_status;
        },
        deleteAccount: async (parent, args) => {
            console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { id } = args;
            return frm_status;
        },
        createRecipeCategories: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: 'Category Created Successfully!',
                success: true
            }
            let { category_name, category_slug, category_auth_id, category_auth_name } = args;
            const user = await recipeCategoriesModel.find({recipe_category_author_id: category_auth_id});
            // console.log(user);
            if(user.length > 0) {
                const cats = await recipeCategoriesModel.find({recipe_category_name: category_name});
                // console.log(cats);
                if(cats.length > 0) {
                    frm_status = {
                        message: 'Category Already Exist.',
                        success: false
                    }
                } else {
                    try {
                        const doc = new recipeCategoriesModel({
                            recipe_category_name: category_name,
                            recipe_category_slug: category_slug,
                            recipe_category_author_id: category_auth_id,
                            recipe_category_author_name: category_auth_name
                        });
                        await doc.save();
                    } catch (error) {
                        console.log(error.message);
                        frm_status = {
                            message: "Unable To Create Category",
                            success: false
                        }
                    }
                }
            } else {
                try {
                    const doc = new recipeCategoriesModel({
                        recipe_category_name: category_name,
                        recipe_category_slug: category_slug,
                        recipe_category_author_id: category_auth_id,
                        recipe_category_author_name: category_auth_name
                    });
                    await doc.save();
                    // frm_status = {
                    //     message: 'Category Created Successfully!',
                    //     success: true
                    // }
                } catch (error) {
                    console.log(error.message);
                    frm_status = {
                        message: "Unable To Create Category",
                        success: false
                    }
                }
            }
            return frm_status;
        },
        updateRecipeCategories: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { category_name, category_name_old, category_slug, category_auth_id } = args;
            const user = await recipeCategoriesModel.find({recipe_category_author_id: category_auth_id});
            // console.log(user);
            if(user.length > 0) {
                const cats = await recipeCategoriesModel.find({recipe_category_name: category_name_old});
                // console.log(cats);
                if(cats.length > 0) {
                    if(category_name == category_name_old) {
                        frm_status = {
                            message: 'Category Already Exist!',
                            success: false
                        }
                    } else {
                        try {
                            await recipeCategoriesModel.findOneAndUpdate({recipe_category_name: category_name_old}, {
                                recipe_category_name: category_name,
                                recipe_category_slug: category_slug
                            }, {
                                new: true
                            });
                            frm_status = {
                                message: 'Category Updated Successfully!',
                                success: true
                            }
                        } catch (error) {
                            frm_status = {
                                message: "Unable To Update Category",
                                success: false
                            }
                        }
                    }
                }
            } else {
                frm_status = {
                    message: "Unable To Find User",
                    success: false
                }
            }
            return frm_status;
        },
        deleteRecipeCategory: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { id } = args;
            try {
                await recipeCategoriesModel.findByIdAndDelete({_id: id});
                frm_status = {
                    message: 'Category Deleted Successfully!',
                    success: true
                }
            } catch (error) {
                frm_status = {
                    message: 'Unable Deleted Category',
                    success: false
                }
            }
            return frm_status;
        },
    }
};

module.exports = resolvers;