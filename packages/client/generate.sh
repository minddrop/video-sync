# https://github.com/grpc/grpc-web#client-configuration-options

mkdir -p src/protos

protoc \
    --js_out=import_style=commonjs,binary:./src/protos \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/protos \
    -I=./protos \
    ./protos/*.proto

# # generate js codes via grpc-tools
# npx grpc_tools_node_protoc \
#     --js_out=import_style=commonjs,binary:./src/protos \
#     --grpc_out=./src/protos \
#     --plugin=protoc-gen-grpc=$(npm bin)/grpc_tools_node_protoc_plugin \
#     -I ./protos \
#     ./protos/*.proto

# # generate d.ts codes
# protoc \
#     --plugin=protoc-gen-ts=$(npm bin)/protoc-gen-ts \
#     --ts_out=./src/protos \
#     -I ./protos \
#     ./protos/*.proto

# protoc --plugin=protoc-gen-grpc=/path/to/grpc_ruby_plugin -I ./protos --ruby_out=lib --grpc_out=lib ./protos/echo.proto

# protoc -I=$DIR echo.proto \
#   --js_out=import_style=commonjs,binary:$OUT_DIR \
#   --grpc-web_out=import_style=typescript,mode=grpcwebtext:$OUT_DIR

