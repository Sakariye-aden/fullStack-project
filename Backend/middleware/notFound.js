const notFound = (req, res, next) => {
    
     const error = new Error(`${req.originalUrl} Not found..`)
     error.statusCode = 404;
     next(error);
}

export default notFound