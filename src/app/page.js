"use client";
import { useEffect, useState } from "react";
import Shortener from "@studiohyperdrive/shortener";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./styles.css";


export default function Home() {
	// =========== constant variables ===========
	// holds the shortened url after form submit; and used to display shortened url
	const [shortURL, setShortURL] = useState("");

	// =========== shortener (= npm module that shortens urls) ===========
	const shortener = new Shortener({
		target: "https://shortie.com/",
		length: 8,
		alphabet: "alphanumeric",
	});

	// =========== formik (= saves the form's data before and after submit) ===========
	const formik = useFormik({
		// list the values you want to save from your form
		initialValues: {
			url: "",
		},

		/* what we'll use to validate that the form data is in the correct format
		// Yup.string().url() may be too strict in recognising what a valid URL is,
		// therefore you could replace .url() with the following regex:
		// .matches( /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!')
		// .required() = if the input is left blank, then "A URL is required" will show
		// reference this: https://stackoverflow.com/questions/61634973/yup-validation-of-website-using-url-very-strict
		*/
		// validate the following form information:
		validationSchema: Yup.object({
			url: Yup.string()
				.matches(
					/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
					"Please enter a valid url"
				)
				.required("A URL is required"),
		}),

		// on submission of the form, do the following:
		// values = the data that was saved from the form
		onSubmit: (values) => {
			// console.log(values);

			// after submitting the form, shorten the long url and return the shortened object
			let shortened = shortener.shorten(values.url);

			// set the useState of shortened to the newly shortened url; so we can display it in HTML
			setShortURL(shortened);
		},
	});

	// console.log(formik.errors);

	return (
		<div id="container">
			<div className="header-container">
				<h1 id="header">URL Shortie</h1>
			</div>
			<div className="form-container">
				<form onSubmit={formik.handleSubmit}>
					<label className="label">
						{/* if the input has been "touched" (i.e. clicked on) and there is an error, 
							display the error, else display 'your long url' 
						*/}
						{formik.touched.url && formik.errors.url
							? formik.errors.url
							: "Your Long URL"}
					</label>
					<input
						className="input"
						type="url"
						name="url"
						value={formik.values.url}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder="Enter your url here"
						required
					/>

					<p className="label">Shortened URL</p>
					<div className="input copy">
						{/* if shortURL is not empty, then render shortened url,
						 else render the placeholder shortie.com/ */}
						{shortURL ? (
							shortURL && (
								<a id="result" href={shortURL.original} target="_blank">
									{shortURL.target}
								</a>
							)
						) : (
							<a id="result" href="">
								https://shortie.com/
							</a>
						)}
					</div>

					<div className="button-container">
						<input className="submit-btn" type="submit" value="Shorten Url" />
					</div>
				</form>

				<h1 id="subheader">Previous URLs </h1>
				<div className="previous-urls-container"></div>
			</div>
		</div>
	);
}
