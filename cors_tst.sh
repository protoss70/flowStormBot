echo "SHOULD NOT BE OK";
curl -XOPTIONS   -H "Access-Control-Request-Method: POST"   -H "Origin: http://mysite.example.com" http://172.17.0.2:8080/health;
echo "";
curl -XOPTIONS   -H "Access-Control-Request-Method: POST"   -H "Origin: http://localhost:8080" http://172.17.0.2:8080/health;
echo "SHOULD BE OK";
curl -XOPTIONS   -H "Access-Control-Request-Method: POST"   -H "Origin: https://app-selection.web.app/index1.html" http://172.17.0.2:8080/health;
echo '';
curl -XOPTIONS   -H "Access-Control-Request-Method: POST"   -H "Origin: http://localhost:8080/" http://172.17.0.2:8080/health;
echo "";
curl -XOPTIONS   -H "Access-Control-Request-Method: POST"   -H "Origin: http://localhost:8080/index1.html" http://172.17.0.2:8080/health;