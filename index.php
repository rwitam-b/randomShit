<!doctype html>
<html>

<head>
    <style>
        html,
        body {
            overflow: hidden;
        }
    </style>
    <link rel="stylesheet" href="animate.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="ws2js.js"></script>
    <script>
        $(document).ready(function() {
                    $("#go").click(function() {
                        var code=$("#prog").val();
                        eval(WS2JS.convert(code));
                    });
                  });
    </script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <h1 class="text-center animated pulse infinite">Code Chalao Baby</h1>
        </div>
        <hr /><br /><br /><br />
        <div class="row text-center">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
                <textarea id="prog" style="resize:none" class="form-control" type="textarea" rows="20" cols="10"></textarea>
            </div>
            <div class="col-sm-3"></div>
        </div><br />
        <div class="row text-center">
              <button id="go" type="button" class="btn btn-primary">RUN !</button>
        </div>
    </div>

</body>

</html>
