"use client";
import { useState } from "react";
import Shortener from "@studiohyperdrive/shortener";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./styles.css";

let storage_index = 0;

// counts the number of urls shortened
function counter() {
	storage_index += 1;
}

// if the sessionStorage length is greater than 15,
// del contents and reset counter
function check_storage() {
	if (sessionStorage.length >= 16) {
		// clear sessionStorage
		sessionStorage.clear();
		// set counter to zero
		storage_index = 0;
	}
}

// on button click, del storage and reset counter
function clear_storage() {
	sessionStorage.clear();
	storage_index = 0;
}

export default function Home() {
	// =========== constant variables ===========

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

			// clear contents if sessionStorage count is over 16 and reset counter
			check_storage();

			// after submitting the form, shorten the long url and return the shortened object
			let shortened = shortener.shorten(values.url);

			// set the useState of shortened to the newly shortened url; so we can display it in HTML
			setShortURL(shortened);

			// save the shortened URL object to sessionStorage
			sessionStorage.setItem(storage_index, JSON.stringify(shortened));

			// increase counter for next entry
			console.log("counter = " + storage_index);

			// to view items in sessionStorage: console.log(JSON.parse(sessionStorage.getItem(0)))
			// to view the object's attributes: console.log(JSON.parse(sessionStorage.getItem(0)).target)
		},
	});

	// console.log(formik.errors);

	// holds the shortened url after form submit; and used to display shortened url
	const [shortURL, setShortURL] = useState("");

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
						<input
							className="submit-btn"
							type="submit"
							value="Shorten Url"
							onClick={counter}
						/>

						{/* messed up counter for some reason, but does clear sessionStorage. Why? */}
						{/* <button className="clear-btn" type="button" onClick={onclick_check_storage}>Clear History</button> */}
					</div>
				</form>

				<h1 id="subheader">
					Previous URLs{" "}
					<span className="storage-counter">
						({sessionStorage.length <= 0 ? "0" : sessionStorage.length})
					</span>
				</h1>
				<div className="previous-urls-container">
					{/* maps through sessionStorage entries and render */}
					{Object.entries(sessionStorage).map(([key, valueJSON]) => {
						const value = JSON.parse(valueJSON);

						return (
							<div className="prev-entry">
								<a
									className="prev-url target"
									href={value.original}
									target="_blank"
								>
									{value.target}
								</a>
								<p className="prev-url original">{value.original}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
