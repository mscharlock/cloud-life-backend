process.env.PORT = 4444;
process.env.MONGO_URI = 'mongodb://localhost/testing';
process.env.CORS_ORIGINS = `http://localhost:${process.env.PORT}`;
process.env.SECRET = 'cool beans';
process.env.DEBUG = true;
process.env.API_URL = `http://localhost:${process.env.PORT}`;
process.env.AWS_ACCESS_KEY_ID='test-id';
process.env.AWS_SECRET_ACCESS_KEY='test-secret';
process.env.AWS_BUCKET='test-bucket';
