import asyncHandler from 'express-async-handler'

const loginAdmin: any = asyncHandler(async (req, res): Promise<any> => {
	if (req.method !== "POST") {
		res.status(404).send("Not Allowed")
		return
	}

	const email = req.body?.email
	return res.status(201).json({
		email: email,
		loggedIn: true
	})
})

export { loginAdmin }
