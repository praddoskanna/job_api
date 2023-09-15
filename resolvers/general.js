const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
const fs = require('fs');
const path = require('path');
const { finished } = require('stream');
const errorMessages = require('../errorMessages');
const { GraphQLError } = require('graphql')
const { cities, cityAreas } = require("../utils/cityList");


const resolvers_General = {
    Query: {
        getCityList: async (_,) => {
            return cities;
        },
        getAreaListByCity: async (_, { city }) => {
            if (city in cityAreas) {
                return cityAreas[city];
            }
            else {
                throw new Error(`City ${city} Not Found . `)
            }
        }
    },
    Upload: GraphQLUpload,
    Mutation: {
        uploadFile: async (_, { file }) => {
            try {
                const { createReadStream, filename, mimetype, encoding } = await file;

                // Define a folder for storing uploaded files
                const uploadDir = path.join(__dirname, '../uploads');
                fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

                const stream = createReadStream();
                const { ext, name } = path.parse(filename);
                const uniqueFileName = `file-${Math.floor(Math.random() * 10000)}${Date.now()}${ext}`;
                const url = path.join(uploadDir, uniqueFileName);
                const out = fs.createWriteStream(url);

                await new Promise((resolve, reject) => {
                    stream.pipe(out);
                    out.on('finish', resolve);
                    out.on('error', reject);
                });
                const filepath = url;
                return { filename, mimetype, encoding, url, ext, filepath };

            } catch (error) {
                console.error("Error uploading file:", error);
                throw new GraphQLError(errorMessages.FILE_UPLOAD_ERROR.message, {
                    extensions: { code: errorMessages.FILE_UPLOAD_ERROR.code },
                });
            }
        },
    },
};

module.exports = resolvers_General;