import { useState } from "react";

import { useMutation, gql } from "@apollo/client";
import axios from "axios";


function makeid(length:any) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

const UPLOAD_FILE = gql`
	mutation createGqlUser($name: String!, $email: String!, $profile_picture: String!) {
		createGqlUser(name: $name, email: $email, profile_picture: $profile_picture) {
			name,
			email,
			profile_picture
		}
	}
`;

const GQLFileUploadDemo = () => {

	const [uploadFile] = useMutation(UPLOAD_FILE, {
		onCompleted: data => console.log(data)
	});

	const [formData, setFormData] = useState({
		user_name: '',
		user_email: '',
		user_profile: ''
	});

	const [fileExt, setFileExt] = useState('');

	const handleInputChange = (e:any) => {
		const {name, value} = e.target;
		setFormData((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		})
	}

	const handleOnChangeFinput = (e:any) => {
		let files = e.target.files[0];
		if(!files) return
		let gfnext = files.name;
		let fext = gfnext.split('.').pop();
		setFileExt(fext);
		// console.log(files.name);
		setFormData((prevState) => {
			return {
				...prevState,
				user_profile: files
			}
		})
		
	}

	const handleFormSubmit = (e: any) => {
		e.preventDefault();
		const fnam = formData.user_profile;
		const newFileName = `${makeid(12)}_${Date.now()}.${fileExt}`;
		const file = new File([fnam], newFileName);
		// console.log(file);
		// console.log(fileExt);
		
		uploadFile({
			variables: {
				name: formData.user_name,
				email: formData.user_email,
				profile_picture: newFileName
			}
		});

		const fData = new FormData();
		fData.append('file', file);
		axios.post('http://localhost:48256/site-uploads', fData)
		.then((res) => {
			console.log(res);
		})
		.catch(err => console.log(err));
		let ss = setTimeout(()=> {
			setFormData({
				user_name: '',
				user_email: '',
				user_profile: ''
			});
			setFileExt('');
			clearTimeout(ss);
		}, 200);
	}

	return (
		<>
			<div className="twgtr-flex twgtr-items-center twgtr-justify-center twgtr-h-[100vh] twgtr-p-5 twgtr-bg-slate-100 dark:twgtr-bg-slate-950">
				<div className="twgtr-max-w-md twgtr-w-full twgtr-bg-white twgtr-rounded-xl twgtr-p-5 dark:twgtr-bg-slate-900">
					<form onSubmit={handleFormSubmit} encType="multipart/form-data">
						<h1 className="twgtr-text-xl twgtr-font-bold twgtr-text-center twgtr-mb-4 dark:twgtr-text-slate-50">GraphQL File Upload Demo</h1>
						<div className="twgtr-mb-3">
							<label className="twgtr-mb-1 twgtr-block dark:twgtr-text-slate-50" htmlFor="nameInput">Name</label>
							<input type="text" id="nameInput" name="user_name" 
							className="twgtr-w-full twgtr-border twgtr-border-solid twgtr-border-slate-300 twgtr-bg-white twgtr-rounded-sm twgtr-py-2 twgtr-px-4 focus:twgtr-outline-0 invalid:twgtr-border-red-600 invalid:twgtr-text-red-600"
							onChange={handleInputChange} value={formData.user_name} autoComplete="off" />
						</div>
						<div className="twgtr-mb-3">
							<label className="twgtr-mb-1 twgtr-block after:twgtr-content-['*'] after:twgtr-ml-0.5 after:twgtr-text-red-500 dark:twgtr-text-slate-50" htmlFor="emailInput">Email</label>
							<input type="email" id="emailInput" name="user_email" 
							className="twgtr-w-full twgtr-border twgtr-border-solid twgtr-border-slate-300 twgtr-bg-white twgtr-rounded-sm twgtr-py-2 twgtr-px-4 focus:twgtr-outline-0 invalid:twgtr-border-red-600 invalid:twgtr-text-red-600" 
							onChange={handleInputChange} value={formData.user_email} autoComplete="off" />
						</div>
						<div className="twgtr-mb-3">
							<p className="twgtr-block twgtr-mb-2 dark:twgtr-text-slate-50">Choose Profile Picture</p>
							<label htmlFor="pictureInput" className="twgtr-px-4 twgtr-py-2 twgtr-cursor-pointer twgtr-inline-block twgtr-text-slate-50 twgtr-bg-blue-600 hover:twgtr-bg-blue-500 focus:twgtr-outline-none focus:twgtr-ring focus:twgtr-ring-blue-200">
								Choose File
							</label>
							<input type="file" id="pictureInput" name="user_profile" className="twgtr-hidden" onChange={handleOnChangeFinput} />
						</div>
						<div className="twgtr-text-center twgtr-pt-3">
							<button type="submit" title="Submit" className="twgtr-px-4 twgtr-py-2 twgtr-cursor-pointer twgtr-inline-block twgtr-text-slate-50 twgtr-bg-blue-600 hover:twgtr-bg-blue-500 focus:twgtr-outline-none focus:twgtr-ring focus:twgtr-ring-blue-200">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default GQLFileUploadDemo;