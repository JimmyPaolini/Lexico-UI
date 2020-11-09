cd src/lambda
zip -qr ../../lambda.zip .
cd ../..

serverless deploy --verbose --stage $1
rm lambda.zip

# npm run build
# aws s3 sync build s3://lexico-static-site-$1