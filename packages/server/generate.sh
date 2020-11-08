mkdir -p ./src/protos

# https://www.npmjs.com/package/grpc_tools_node_protoc_ts#how-to-use
$(npm bin)/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:./src/protos \
    --grpc_out=./src/protos \
    --plugin=protoc-gen-grpc=$(npm bin)/grpc_tools_node_protoc_plugin \
    -I ./protos \
    ./protos/*.proto

# generate d.ts codes
protoc \
    --plugin=protoc-gen-ts=$(npm bin)/protoc-gen-ts \
    --ts_out=./src/protos \
    -I ./protos \
    ./protos/*.proto
