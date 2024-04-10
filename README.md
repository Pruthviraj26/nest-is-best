## Naming convention

folder name - kebab-case
file name - snake_case
variable name - camelCase
class name - PascalCase
function name - camelCase
interface name - camelCase(having I prefix example - IUserInfo)

## Boilerplate having -

Router setup ✅
config setup ✅
response setup ✅
error setup (static and dynamic as well) ✅
logger setup ✅
Database setup ✅
repository setup
pagination setup ✅
external service calling setup ✅
redis setup
kafka setup
CORS setup

## Response formate
{
    statusCode : 200,
    message : "",
    data : {} || [{}],

    <!--  error -->
    errors : {} || [{}],
    errorCode : "CUSTOM_CODE_2000",
    debugId : "debugUUID",
    timestamp : "InGMT",
    metadata : {
        total : 100,
        page : 2
        perPage : 20,
        previousPage : "",
        nextPage : "",
    }
}
