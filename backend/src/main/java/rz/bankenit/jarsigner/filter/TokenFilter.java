package rz.bankenit.jarsigner.filter;

import java.io.IOException;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 
 */
@Component
@Order(1)
public class TokenFilter implements Filter
{
    /**
     *
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException
    {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String auth = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
//        if (auth == null)
//        {
//            System.err.println(httpRequest.getRequestURI());
//            this.handleUnauthorized((HttpServletResponse) response);
//        }
//        else
//        {
            chain.doFilter(httpRequest, response);
            //        }
    }

    private void handleUnauthorized(HttpServletResponse response)
    {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
    }
}