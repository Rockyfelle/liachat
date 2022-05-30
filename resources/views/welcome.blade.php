<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Learnplace</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
</head>
<body>
    <!-- React root DOM -->
    <div id="app">
    </div>

	<!-- Pusher -->
	<script>
		// Enable pusher logging - don't include this in production
		
	</script>

    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>