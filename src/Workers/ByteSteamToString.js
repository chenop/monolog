const formatException = (exceptionMessage) => {
    let result = exceptionMessage || '';

    var searchReplaces = [
        {
            find:/   at/g,
            repl: '\r\n   at'},
        {
            find:/ ---> /g,
            repl: '\r\n ---> '},
        {
            find:/\) at /g,
            repl: '\r\n at '},
        {
            find:/ --- End of inner exception stack trace ---/g,
            repl: '\r\n   --- End of inner exception stack trace ---'}
    ]

    searchReplaces.forEach(function(item){
        result = result.replace(item.find, item.repl);
    });

    return result;
};

addEventListener('message', function(e) {

  let data = e.data;
  let dataView = new DataView(data.buffer);
  let decoder = new TextDecoder('utf-8');
  let decodedString = decoder.decode(dataView);
  let arr = decodedString
    .split(/\r?\n/g)
    //.split(/#015/g)
    .filter(line => (line.trim().length) )
    .map( line => (formatException(line)));

  postMessage(arr);

}, false);
