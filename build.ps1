$bytes = [System.IO.File]::ReadAllBytes("D:\RGSmartTechnology\logo_transparent.png")
$b64 = [System.Convert]::ToBase64String($bytes)
$LOGO = "data:image/png;base64,$b64"
$htmlPart1 = Get-Content "D:\RGSmartTechnology\html_part1.txt" -Raw -Encoding UTF8
$htmlPart2 = Get-Content "D:\RGSmartTechnology\html_part2.txt" -Raw -Encoding UTF8
$final = $htmlPart1.Replace("__LOGO__", $LOGO) + $htmlPart2
[System.IO.File]::WriteAllText("D:\RGSmartTechnology\index.html", $final, [System.Text.Encoding]::UTF8)
Write-Host "OK $([math]::Round((Get-Item 'D:\RGSmartTechnology\index.html').Length/1KB,0))KB"
