cd src/lambda/search
zip -qr ../../../search.zip .
cd ../literature
zip -qr ../../../literature.zip .
cd ../../..

serverless deploy --verbose --stage $1
rm search.zip
rm literature.zip

# yarn build
# aws s3 sync build s3://lexico-static-site-$1