# Complexity: O(e * log^2(b))
def powmod(base, exponent, mod):
    prod = 1

    for i in range(exponent):
        prod *= base
        prod = prod % mod

    return prod

# Complexity: O(log(e) * polylog(b))
def powmod2(base, exponent, mod):
    prod = 1

    while exponent > 0:
        if exponent & 1 == 1:
            prod *= base
        prod %= mod
        base *= base
        base %= mod
        exponent /= 2

    return prod

print powmod2(5, 107000000, 10000007)
print     pow(5, 107000000, 10000007)
