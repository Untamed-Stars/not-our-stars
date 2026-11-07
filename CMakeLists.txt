
# CMakeLists.txt - ROOT C++ BUILD CONFIGURATION

cmake_minimum_required(VERSION 3.20)

project(NotOurStars LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(nos_core
    cpp/main.cpp
    cpp/core/g1.cpp
)

set_target_properties(nos_core PROPERTIES
    SUFFIX ".js"
)

target_link_options(nos_core PRIVATE
    "-sWASM=1"
    "-sMODULARIZE=1"
    "-sEXPORT_ES6=1"
    "-sENVIRONMENT=web"
    "-sALLOW_MEMORY_GROWTH=1"
    "-sEXPORTED_FUNCTIONS=['_main']"
    "-sEXPORTED_RUNTIME_METHODS=['ccall','cwrap']"
)

set_target_properties(nos_core PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/public/wasm"
)
