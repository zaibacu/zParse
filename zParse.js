/*
  The MIT License (MIT)

  Copyright (c) 2013 Šarūnas Navickas

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var zParse = {
  //Function which does all the nasty job
  Parse: function(text){
    var search = Array(/\[b\](.*?)\[\/b\]/gi,
         /\[i\](.*?)\[\/i\]/gi,
         /\[u\](.*?)\[\/u\]/gi,
         /\[h\](.*?)\[\/h\]/gi,
                     /\[img\](.*?)\[\/img\]/gi,
                     /\[url\](.*?)\[\/url\]/gi,
                     /\[url=(.*?)\](.*?)\[\/url\]/gi,
                     /\[quote\](.*?)\[\/quote\]/gi,
         /\[youtube\](.*?)\[\/youtube\]/gi,
         /\[list\]/gi,
         /\[\/list\]/gi ,
         /\[\*\](.*?)\[\/\*\]/gi ,
         /\[\*\](.*?)/gi
        );
    var replace = Array('<b>$1</b>',
                      '<i>$1</i>',
                      '<u>$1</u>',
          '<h1>$1</h1>',
                      '<img src="$1" alt="image"/>',
                      '<a href="$1">$1</a>',
                      '<a href="$1">$2</a>',
                      '<blockquote>$1</blockquote>',
          '<p><iframe width="420" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></p>',
          '<ul>',
          '</ul>',
          '<li>$1</li>',
          '<li>$1</li>'
                     );
    for(i in search)
    {
      text = text.replace(search[i],replace[i]);
    }
    return text;
  },
  CleanCode: function(text){
    var search = Array(
        /</gi,
        />/gi
      );

    var replace = Array(
        '&lt;',
        '&gt;'
      );

    for(i in search)
    {
      text = text.replace(search[i],replace[i]);
    }
    return text;
  },

  //Function which handles 'code' tags
  BBCodeToHtml: function(text){ 
    text = text.replace(/\[code\]/gi, "%%%");
    text = text.replace(/\[\/code\]/gi, "%%%");
    var buff = text.split("%%%");
    var n_txt = "";
    var k = 0;
    for(i in buff)
    {
      if(k == 1)
    	  n_txt += "<pre class='code'>" + this.CleanCode(buff[i]) + "</pre>";
    	else
    	  n_txt += this.Parse(buff[i]);
    	k = 1 - k;
    }
    n_txt = n_txt.replace(/^\n+|\n+$/g, ""); //Trim leading line breaks in front and end of text
    n_txt = n_txt.replace(/\n/g, "<br />"); //Replace line breaks with HTML symbol for that
    return n_txt;
  }
};
