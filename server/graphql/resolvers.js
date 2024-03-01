
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SiteUserModel = require("../mongodb/models/siteUsers.js");
const recipeCategoriesModel = require("../mongodb/models/recipeCategories.js");
const RecipeModel = require("../mongodb/models/recipes.js");

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
                    let cipp_c = await recipeCategoriesModel.find({'author.author_id': args.id})
                    let rcp = await RecipeModel.find({'author.author_id': args.id});
                    respdata = {
                        user_name: user.user_full_name,
                        user_photo: user.user_profile_photo,
                        ripp: rcp.length,
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
                cipp: 0,
                sripp: 0,
            };
            try {
                const user = await SiteUserModel.findOne({_id: args.id});
                if(user) {
                    respdata = {
                        user_name: user.user_full_name,
                        user_email: user.user_email,
                        ripp: user.user_recipe_items_per_page,
                        cipp: user.user_categories_items_per_page,
                        sripp: user.user_saved_recipes_items_per_page
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
                const user = await SiteUserModel.find({_id: id});
                if(user) {
                    const cats = await recipeCategoriesModel.find({'author.author_id': id});
                    if(cats.length > 0) {
                        cats.forEach( async (usr, idx) => {
                            let obj = {
                                id: usr._id.toString(),
                                recipe_category_name: usr.recipe_category_name,
                                recipe_category_slug: usr.recipe_category_slug,
                                author: {
                                    author_id: usr.author.author_id,
                                    author_name: usr.author.author_name
                                }
                            }
                            await data.push(obj);
                        });
                    } else {
                        data = [];
                    }
                } else {
                    data = [];
                }
            } catch (error) {
                console.log(error.message);
                data = [];
            }
            // console.log(data);
            return data;
        },
        getPerPagesCount: async (parent, args) => {
            let { id } = args;
            let respdata = {
                category_per_page: 0,
                recipes_per_page: 0,
                saved_recipes_per_page: 0
            }
            const user = await SiteUserModel.findOne({_id: id});
            if(user) {
                respdata = {
                    category_per_page: user.user_categories_items_per_page,
                    recipes_per_page: user.user_recipe_items_per_page,
                    saved_recipes_per_page: user.user_saved_recipes_items_per_page
                }
            }
            return respdata;
        },
        getUserFullName: async (parent, args) => {
            let { id } = args;
            let respdata = {
                user_name: ''
            };
            const user = await SiteUserModel.findOne({_id: id});
            if(user) {
                respdata = {
                    user_name: user.user_full_name
                }
            }
            return respdata;
        },
        getAllRecipes: async (parent, args) => {
            // console.log(args);
            let response_data = [];
            try {
                const user = await SiteUserModel.find({_id: args.id});
                if(user) {
                    const recipes = await RecipeModel.find({'author.author_id': args.id});
                    if(recipes.length > 0) {
                        recipes.forEach( async (rec, idx) => {
                            let obj = {
                                id: rec._id.toString(),
                                recipe_title: rec.recipe_title,
                                recipe_type: rec.recipe_type,
                                recipe_featured_image: rec.recipe_featured_image,
                                recipe_categories: rec.recipe_categories,
                                recipe_summary: rec.recipe_summary,
                                recipe_content: rec.recipe_content,
                                recipe_ingradients: rec.recipe_ingradients,
                                author: {
                                    author_name: rec.author.author_name,
                                    author_id: rec.author.author_id,
                                },
                                recipe_prep_time: rec.recipe_prep_time,
                                recipe_cook_time: rec.recipe_cook_time,
                                recipe_total_time: rec.recipe_total_time,
                                recipe_created_at: rec.recipe_created_at
                            }
                            await response_data.push(obj);
                        });
                    } else {
                        response_data = [];
                    }
                } else {
                    response_data = [];
                }
            } catch (error) {
                console.log(error.message);
                response_data = [];
            }

            return response_data;
        },
        getSingleRecipe: async (parent, args) => {
            // console.log(args);
            let response_data = [];
            try {
                const user = await SiteUserModel.find({_id: args.user_id});
                if(user) {
                    let reci = await RecipeModel.find({_id: args.id});
                    // console.log(reci);
                    reci.forEach( async (rec, idx) => {
                        let obj = {
                            id: rec._id.toString(),
                            recipe_title: rec.recipe_title,
                            recipe_type: rec.recipe_type,
                            recipe_featured_image: rec.recipe_featured_image,
                            recipe_categories: rec.recipe_categories,
                            recipe_summary: rec.recipe_summary,
                            recipe_content: rec.recipe_content,
                            recipe_ingradients: rec.recipe_ingradients,
                            author: {
                                author_name: rec.author.author_name,
                                author_id: rec.author.author_id,
                            },
                            recipe_prep_time: rec.recipe_prep_time,
                            recipe_cook_time: rec.recipe_cook_time,
                            recipe_total_time: rec.recipe_total_time,
                            recipe_created_at: rec.recipe_created_at
                        }
                        await response_data.push(obj);
                    });
                } else {
                    response_data = [];
                }
            } catch (error) {
                console.log(error.message);
                response_data = [];
            }

            return response_data;
        },
        getUserByID: async (parent, args) => {
            // console.log(args);
            let resp = {
                user_id: '',
                user_name: '',
                user_email: '',
                user_photo: '',
                ripp: 0,
                cipp: 0,
                sripp: 0,
                saved_recipes: []
            }

            let { id } = args;
            let user = await SiteUserModel.find({_id: id});
            if(user.length > 0) {
                let gsr = user[0].saved_recipes;
                let arr = [];
                if(gsr.length > 0) {
                    let rps = await RecipeModel.find({ '_id': { $in: gsr } });
                    arr = rps;
                }
                // console.log(arr);
                resp = {
                    user_id: user[0]._id,
                    user_name: user[0].user_full_name,
                    user_email: user[0].user_email,
                    user_photo: user[0].user_profile_photo,
                    ripp: user[0].user_recipe_items_per_page,
                    cipp: user[0].user_categories_items_per_page,
                    sripp: user[0].user_saved_recipes_items_per_page,
                    saved_recipes: arr
                }
            }

            return resp;
        },
        getSIngleRecipeByID: async (parent, args) => {
            // console.log(args);
            let response_data = {
                id: '',
                recipe_title: '',
                recipe_type: '',
                recipe_summary: '',
                recipe_content: '',
                recipe_ingradients: [],
                recipe_featured_image: '',
                recipe_categories: [],
                author: {
                    author_id: '',
                    author_name: ''
                },
                recipe_prep_time: '',
                recipe_cook_time: '',
                recipe_total_time: '',
                recipe_created_at: ''
            };

            let grcp = await RecipeModel.find({_id: args.id});
            if(grcp.length > 0) {
                let dt = grcp[0];
                response_data = {
                    id: dt._id.toString(),
                    recipe_title: dt.recipe_title,
                    recipe_type: dt.recipe_type,
                    recipe_summary: dt.recipe_summary,
                    recipe_content: dt.recipe_content,
                    recipe_ingradients: dt.recipe_ingradients,
                    recipe_featured_image: dt.recipe_featured_image,
                    recipe_categories: dt.recipe_categories,
                    author: {
                        author_id: dt.author.author_id,
                        author_name: dt.author.author_name
                    },
                    recipe_prep_time: dt.recipe_prep_time,
                    recipe_cook_time: dt.recipe_cook_time,
                    recipe_total_time: dt.recipe_total_time,
                    recipe_created_at: dt.recipe_created_at
                };
            }
            return response_data;
        },
        getAggrRecipes: async () => {
            let recips = await RecipeModel.find({});
            if(recips.length > 0) {
                return recips;
            }
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
                                user_recipe_items_per_page: 4,
                                user_categories_items_per_page: 6,
                                user_saved_recipes_items_per_page: 4,
                                saved_recipes: [],
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
            let {id, user_name, user_email, ripp, cipp, sripp} = args;
            const user = await SiteUserModel.findOne({_id: id});
            if(user) {
                if(user_name && user_email && ripp && cipp) {
                    try {
                        await SiteUserModel.findOneAndUpdate({_id: id}, {
                            user_full_name: user_name,
                            user_email,
                            user_recipe_items_per_page: ripp,
                            user_categories_items_per_page: cipp,
                            user_saved_recipes_items_per_page: sripp
                        }, {
                            new: true
                        });
                        frm_status = {
                            message: "User Updated Successfully!",
                            success: true
                        }

                        // Update Categories Author Name.
                        let cats = await recipeCategoriesModel.find({'author.author_id': id})
                        // console.log(cats);
                        if(cats.length > 0) {
                            await recipeCategoriesModel.updateMany({'author.author_id': id}, {
                                author: {
                                    author_id: id,
                                    author_name: user_name
                                }
                            });
                        }

                        // Update Recipe Author Name.
                        let reci = await RecipeModel.find({'author.author_id': id});
                        // console.log(reci);
                        if(reci.length > 0) {
                            await RecipeModel.updateMany({'author.author_id': id}, {
                                author: {
                                    author_id: id,
                                    author_name: user_name
                                }
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
            // console.log(args);
            let frm_status = {
                message: '',
                success: false,
                recipe_featured_image: [],
                profile_photo: ''
            }
            let { id } = args;

            // Get & Delete Categories.
            let rc_cats = await recipeCategoriesModel.find({'author.author_id': id});
            if(rc_cats.length > 0) {
                await recipeCategoriesModel.deleteMany({'author.author_id': id});
            }

            // Get & Delete Recipes.
            let cr_main = await RecipeModel.find({'author.author_id': id});
            let arr = [];
            if(cr_main.length > 0) {
                let res = await RecipeModel.find({'author.author_id': id});
                if(res.length > 0) {
                    let imgs = await RecipeModel.find({'author.author_id': id}).select('recipe_featured_image');
                    imgs.forEach((dt, idx) => {
                        let feimg = dt.recipe_featured_image;
                        if(feimg !== 'default') {
                            // console.log(feimg);
                            arr.push(feimg);
                        }
                    });
                    await RecipeModel.deleteMany({'author.author_id': id});
                }
            }
            // console.log(arr);
            
            // Finally Delete User.
            let mn_usr = await SiteUserModel.find({_id: id});
            // console.log(mn_usr);
            let pp = mn_usr[0].user_profile_photo;
            if(mn_usr.length > 0) {
                await SiteUserModel.findByIdAndDelete({_id: id});
            }
            frm_status = {
                message: 'Account Deleted Successfully!',
                success: true,
                recipe_featured_image: arr,
                profile_photo: pp
            }
            // console.log(frm_status);
            return frm_status;
        },
        createRecipeCategories: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: 'Category Created Successfully!',
                success: true
            }
            let { recipe_category_name, recipe_category_slug, recipe_category_author_id, recipe_category_author_name } = args;
            const user = await SiteUserModel.find({_id: recipe_category_author_id});
            // console.log(user);
            if(user) {
                const cats = await recipeCategoriesModel.find({'author.author_id': recipe_category_author_id}).select("recipe_category_name");
                // console.log(cats);
                if(cats.length > 0) {
                    let ctar = cats.map((itm) => itm.recipe_category_name);
                    // console.log(ctar);
                    if(recipe_category_name.includes(ctar)) {
                        console.log("hey");
                        frm_status = {
                            message: 'Category Already Exist.',
                            success: false
                        }
                    } else {
                        // console.log("hey else");
                        const doc = new recipeCategoriesModel({
                            recipe_category_name,
                            recipe_category_slug,
                            author: {
                                author_id: recipe_category_author_id,
                                author_name: recipe_category_author_name
                            }
                        });
                        await doc.save();
                    }
                        
                } else {
                    try {
                        const doc = new recipeCategoriesModel({
                            recipe_category_name,
                            recipe_category_slug,
                            author: {
                                author_id: recipe_category_author_id,
                                author_name: recipe_category_author_name
                            }
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
                frm_status = {
                    message: "Unable To Find User",
                    success: false
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
            let { cat_id, recipe_category_name, category_name_old, recipe_category_slug, recipe_category_author_id } = args;
            const user = await SiteUserModel.find({_id: recipe_category_author_id});
            // console.log(user);
            if(user) {
                const cats = await recipeCategoriesModel.find({recipe_category_name: category_name_old});
                // console.log(cats);
                if(cats.length > 0) {
                    if(recipe_category_name == category_name_old) {
                        frm_status = {
                            message: 'Category Already Exist!',
                            success: false
                        }
                    } else {
                        try {
                            await recipeCategoriesModel.findOneAndUpdate({_id: cat_id}, {
                                recipe_category_name,
                                recipe_category_slug,
                            }, {
                                new: true
                            });
                            frm_status = {
                                message: 'Category Updated Successfully!',
                                success: true
                            }
                        } catch (error) {
                            console.log(error.message);
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
            let { id, user_id } = args;
            const user = await SiteUserModel.find({_id: user_id});
            if(user) {
                try {
                    await recipeCategoriesModel.findByIdAndDelete({_id: id});
                    frm_status = {
                        message: 'Category Deleted Successfully!',
                        success: true
                    }
                    let reci = await RecipeModel.find({'author.author_id': user_id});
                    if(reci.length > 0) {
                        reci.forEach((item) => {
                            const index = item.recipe_categories.indexOf(id);
                            const arr = item.recipe_categories;
                            if (index !== -1) {
                                // item.recipe_categories[index] = category_name;
                                arr.splice(index, 1);
                            }
                            item.save();
                        });
                    }
                } catch (error) {
                    frm_status = {
                        message: 'Unable Deleted Category',
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false
                }
            }
            return frm_status;
        },
        createNewRecipe: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { 
                recipe_title, 
                recipe_type,
                recipe_featured_image, 
                recipe_categories, 
                recipe_summary, 
                recipe_content, 
                recipe_ingradients,
                recipe_author, 
                recipe_author_id, 
                recipe_prep_time, 
                recipe_cook_time, 
                recipe_total_time, 
                recipe_created_at, 
            } = args;

            const user = await SiteUserModel.find({_id: recipe_author_id});
            if(user) {
                try {
                    let doc = new RecipeModel({
                        recipe_title,
                        recipe_type, 
                        recipe_featured_image,
                        recipe_categories,
                        recipe_summary,
                        recipe_content,
                        recipe_ingradients,
                        author: {
                            author_name: recipe_author,
                            author_id: recipe_author_id
                        },
                        recipe_prep_time, 
                        recipe_cook_time, 
                        recipe_total_time, 
                        recipe_created_at
                    });
                    await doc.save();
                    frm_status = {
                        message: 'Recipe Created Successfully!',
                        success: true
                    }
                } catch (error) {
                    console.log(error.message);
                    frm_status = {
                        message: 'Unable To Create New Recipe.',
                        success: false
                    }
                }
                    
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false
                }
            }
            return frm_status;
        },
        updateRecipe: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { 
                id, 
                user_id, 
                recipe_title, 
                recipe_type, 
                recipe_featured_image, 
                recipe_categories, 
                recipe_summary, 
                recipe_content, 
                recipe_ingradients, 
                recipe_prep_time, 
                recipe_cook_time, 
                recipe_total_time 
            } = args;
            let user = await SiteUserModel.findOne({_id: user_id});
            if(user) {
                let recipe = await RecipeModel.find({_id: id});
                // console.log(recipe);
                if(recipe.length > 0) {
                    try {
                        await RecipeModel.findByIdAndUpdate({_id: id}, {
                            recipe_title,
                            recipe_type,
                            recipe_featured_image,
                            recipe_categories,
                            recipe_summary,
                            recipe_content,
                            recipe_ingradients, 
                            recipe_prep_time, 
                            recipe_cook_time, 
                            recipe_total_time, 
                        }, { new: true });
                        frm_status = {
                            message: 'Recipe Updated Successfully!',
                            success: true
                        }
                    } catch (error) {
                        console.log(error.message);
                        frm_status = {
                            message: 'Unable To Update Recipe.',
                            success: false
                        }
                    }
                } else {
                    frm_status = {
                        message: 'Unable To Find Recipe.',
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false
                }
            }
        
            return frm_status;
        },
        deleteRecipe: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { id, user_id } = args;
            const user = await SiteUserModel.find({_id: user_id});
            if(user) {
                try {
                    let rcf = await RecipeModel.find({_id: id});
                    if(rcf.length > 0) {
                        let usr = await SiteUserModel.find({"saved_recipes": { $in: id }});
                        if(usr.length > 0) {
                            // console.log(usr);
                            await SiteUserModel.updateMany({"saved_recipes": { $in: id }}, {
                                $pull: {
                                    saved_recipes: id
                                }
                            });  
                        }
                        await RecipeModel.findByIdAndDelete({_id: id});
                        frm_status = {
                            message: 'Recipe Deleted Successfully!',
                            success: true
                        }
                    } else {
                        frm_status = {
                            message: 'Unable To Find Recipe.',
                            success: false
                        }
                    }
                } catch (error) {
                    console.log(error.message);
                    frm_status = {
                        message: 'Unable To Delete Recipe.',
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false
                }
            }
            return frm_status;
        },
        deleteAllRecipes: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false,
                recipe_featured_image: []
            }

            let { user_id } = args;
            let user = await SiteUserModel.find({_id: user_id});
            let arr = [];
            if(user.length > 0) {
                let recps = await RecipeModel.find({'author.author_id': user_id});
                if(recps.length > 0) {
                    let imgs = await RecipeModel.find({'author.author_id': user_id}).select('recipe_featured_image');
                    imgs.forEach((dt, idx) => {
                        let feimg = dt.recipe_featured_image;
                        if(feimg !== 'default') {
                            // console.log(feimg);
                            arr.push(feimg);
                        }
                    });
                    let yy = await RecipeModel.find({'author.author_id': user_id}).select('_id');
                    let idarr = yy.length > 0 ? yy.map((itm) => itm._id.toString()) : [];
                    let usr = idarr.length > 0 ? await SiteUserModel.find({"saved_recipes": { $in: idarr }}) : [];
                    if(usr.length > 0) {
                        // console.log(usr);
                        // console.log(idarr);
                        await SiteUserModel.updateMany({"saved_recipes": { $in: idarr }}, {
                            $pull: {
                                "saved_recipes": { $in: idarr }
                            }
                        });
                    }
                    await RecipeModel.deleteMany({'author.author_id': user_id});
                    frm_status = {
                        message: 'All Recipes Deleted Successfully!',
                        success: true,
                        recipe_featured_image: arr
                    }
                } else {
                    frm_status = {
                        message: 'No Recipes Found.',
                        success: true,
                        recipe_featured_image: []
                    }
                }
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false,
                    recipe_featured_image: []
                }
            }
            return frm_status;
        },
        deleteAllRecipeCategory: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false,
            }

            let { user_id } = args;
            let user = await SiteUserModel.find({_id: user_id});
            if(user.length > 0) {
                let allcts = await recipeCategoriesModel.find({'author.author_id': user_id})
                if(allcts.length > 0) {
                    await recipeCategoriesModel.deleteMany({'author.author_id': user_id});
                    frm_status = {
                        message: 'All Categories Deleted Successfully!',
                        success: true
                    }
                } else {
                    frm_status = {
                        message: 'No Categories Found.',
                        success: true
                    }
                }
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false
                }
            }
            return frm_status;
        },
        saveRecipe: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { user_id, recipe_id } = args;
            let user = await SiteUserModel.find({_id: user_id});
            if(user.length > 0) {
                let chkrc = await RecipeModel.find({_id: recipe_id});
                if(chkrc.length > 0) {
                    await SiteUserModel.findOneAndUpdate({_id: user_id}, {
                        $push: {
                            saved_recipes: recipe_id
                        }
                    });                
                    frm_status = {
                        message: 'Recipe Saved Successfully!',
                        success: true
                    }
                } else {
                    frm_status = {
                        message: 'Recipe Not Found!',
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false
                }
            }
            return frm_status;
        },
        unsaveRecipe: async (parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let { user_id, recipe_id } = args;
            let user = await SiteUserModel.find({_id: user_id});
            if(user.length > 0) {
                let chkrc = await RecipeModel.find({_id: recipe_id});
                if(chkrc.length > 0) {
                    await SiteUserModel.findOneAndUpdate({_id: user_id}, {
                        $pull: {
                            saved_recipes: recipe_id
                        }
                    });                
                    frm_status = {
                        message: 'Recipe Removed From Save Successfully!',
                        success: true
                    }
                } else {
                    frm_status = {
                        message: 'Recipe Not Found!',
                        success: false
                    }
                }
            } else {
                frm_status = {
                    message: 'Unable To Find User.',
                    success: false
                }
            }
            return frm_status;
        },
        checkRecipeInRecords: async(parent, args) => {
            // console.log(args);
            let frm_status = {
                message: '',
                success: false
            }
            let rp = await RecipeModel.find({_id: args.rid});
            if(rp.length > 0) {
                frm_status = {
                    message: 'Recipe Found!',
                    success: true
                }
            } else {
                frm_status = {
                    message: 'Recipe Not Found!',
                    success: false
                }
            }
            return frm_status;
        },
    },
    RecipeType: {
        recipe_categories: async (data) => {
            // console.log(data);
            let cats = data.recipe_categories;
            if(cats.length > 0) {
                let resp = await recipeCategoriesModel.find({_id: cats});
                // console.log(resp);
                return resp;
            } else {
                return [];
            }
        }
    }
};

module.exports = resolvers;