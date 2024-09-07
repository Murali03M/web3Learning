const crypto = require('crypto');

function findWithash(prefix)
{
    input = 0;
    while (true)
    {
        let inputStr = input.toString();
        let hash = crypto.createHash('sha256').update(inputStr).digest('hex');
        if (hash.startsWith(prefix))
        {
            return ({ input: inputStr, hash: hash})
        }

        input++;
    }
}


const result = findWithash("00000");
console.log(result.input,"input");
console.log(result.hash,"hash");