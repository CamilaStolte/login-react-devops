describe('Validation Utils Tests', () => {
  const validateLogin = (email, password) => {
    const validEmail = 'eduardo.lino@pucpr.br';
    const validPassword = '123456';
    
    return email === validEmail && password === validPassword;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password && password.length >= 6;
  };

  describe('validateLogin function', () => {
    test('returns true for correct credentials', () => {
      const result = validateLogin('eduardo.lino@pucpr.br', '123456');
      expect(result).toBe(true);
    });

    test('returns false for incorrect email', () => {
      const result = validateLogin('wrong@email.com', '123456');
      expect(result).toBe(false);
    });

    test('returns false for incorrect password', () => {
      const result = validateLogin('eduardo.lino@pucpr.br', 'wrong');
      expect(result).toBe(false);
    });

    test('returns false for both incorrect credentials', () => {
      const result = validateLogin('wrong@email.com', 'wrong');
      expect(result).toBe(false);
    });

    test('returns false for empty email', () => {
      const result = validateLogin('', '123456');
      expect(result).toBe(false);
    });

    test('returns false for empty password', () => {
      const result = validateLogin('eduardo.lino@pucpr.br', '');
      expect(result).toBe(false);
    });

    test('returns false for both empty fields', () => {
      const result = validateLogin('', '');
      expect(result).toBe(false);
    });

    test('is case sensitive for email', () => {
      const result = validateLogin('EDUARDO.LINO@PUCPR.BR', '123456');
      expect(result).toBe(false);
    });
  });

  describe('isValidEmail function', () => {
    test('validates correct email format', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('eduardo.lino@pucpr.br')).toBe(true);
    });

    test('rejects invalid email formats', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('test.domain.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('test @domain.com')).toBe(false);
    });

    test('handles edge cases', () => {
      expect(isValidEmail('a@b.c')).toBe(true);
      expect(isValidEmail('test+tag@domain.com')).toBe(true);
      expect(isValidEmail('test.email.with+symbol@example.com')).toBe(true);
    });
  });

  describe('isValidPassword function', () => {
    test('validates password with minimum length', () => {
      expect(isValidPassword('123456')).toBe(true);
      expect(isValidPassword('password')).toBe(true);
      expect(isValidPassword('abcdef')).toBe(true);
    });

    test('rejects passwords below minimum length', () => {
      expect(isValidPassword('12345')).toBe(false);
      expect(isValidPassword('abc')).toBe(false);
      expect(isValidPassword('1')).toBe(false);
    });


    test('accepts passwords with special characters', () => {
      expect(isValidPassword('pass@123')).toBe(true);
      expect(isValidPassword('my-password!')).toBe(true);
      expect(isValidPassword('test_pass#')).toBe(true);
    });
  });

  describe('Combined validation scenarios', () => {
    test('validates complete login scenarios', () => {
      const testCases = [
        { email: 'eduardo.lino@pucpr.br', password: '123456', expected: true },
        { email: 'wrong@email.com', password: '123456', expected: false },
        { email: 'eduardo.lino@pucpr.br', password: 'wrong', expected: false },
        { email: 'invalid-email', password: '123456', expected: false },
        { email: 'eduardo.lino@pucpr.br', password: '123', expected: false },
        { email: '', password: '', expected: false },
      ];

      testCases.forEach(({ email, password, expected }) => {
        const isEmailValid = isValidEmail(email);
        const isPasswordValid = isValidPassword(password);
        const isLoginValid = validateLogin(email, password);
        
        if (expected) {
          expect(isEmailValid).toBe(true);
          expect(isPasswordValid).toBe(true);
          expect(isLoginValid).toBe(true);
        } else {
          const hasValidationError = !isEmailValid || !isPasswordValid || !isLoginValid;
          expect(hasValidationError).toBe(true);
        }
      });
    });
  });

  describe('Security considerations', () => {
    test('does not accept SQL injection attempts', () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "admin'--",
        "' OR '1'='1",
        "' UNION SELECT * FROM users --"
      ];

      maliciousInputs.forEach(input => {
        expect(validateLogin(input, '123456')).toBe(false);
        expect(validateLogin('eduardo.lino@pucpr.br', input)).toBe(false);
      });
    });

    test('handles XSS attempts in input', () => {
      const xssInputs = [
        "<script>alert('xss')</script>",
        "javascript:alert('xss')",
        "<img src=x onerror=alert('xss')>",
        "';alert('xss');//"
      ];

      xssInputs.forEach(input => {
        expect(validateLogin(input, '123456')).toBe(false);
        expect(validateLogin('eduardo.lino@pucpr.br', input)).toBe(false);
      });
    });
  });
});