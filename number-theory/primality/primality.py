from math import sqrt

# Omega(n)
def is_prime_trial_list(n):
    """Determines if a number n is prime using trial division.
       Uses a list of primes for witnessing."""
    primes = [2]

    for candidate in range(3, n + 1):
        is_prime_flag = True
        for witness in primes:
            if witness * witness > candidate:
                break
            if candidate % witness == 0:
                is_prime_flag = False
                break
        if is_prime_flag:
            primes.append(candidate)

    return n in primes

# Omega(n^(1/2))
def is_prime_trial_simple(n):
    """Determines if a number n is prime using simple trial division."""

    for witness in range(2, int(sqrt(n)) + 1):
        if n % witness == 0:
            return False

    return True

print 'Simple trial: '
for candidate in range(2, 100):
    if is_prime_trial_simple(candidate):
        print candidate

print 'Trial list: '
for candidate in range(2, 100):
    if is_prime_trial_list(candidate):
        print candidate
