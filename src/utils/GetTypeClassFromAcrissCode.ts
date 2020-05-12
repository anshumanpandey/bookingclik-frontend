export default (acrissCode: string) => {
    let category = ''

    if (acrissCode[0] == 'M') category = 'Mini'
    if (acrissCode[0] == 'N') category = 'Mini Elite'
    if (acrissCode[0] == 'E') category = 'Economy'
    if (acrissCode[0] == 'H') category = 'Economy Elite'
    if (acrissCode[0] == 'C') category = 'Compact'
    if (acrissCode[0] == 'D') category = 'Compact Elite'
    if (acrissCode[0] == 'I') category = 'Intermediate'
    if (acrissCode[0] == 'J') category = 'Intermediate Elite'
    if (acrissCode[0] == 'S') category = 'Standard'
    if (acrissCode[0] == 'R') category = 'Standard Elite'
    if (acrissCode[0] == 'F') category = 'Fullsize'
    if (acrissCode[0] == 'G') category = 'Fullsize Elite'
    if (acrissCode[0] == 'P') category = 'Premium'
    if (acrissCode[0] == 'U') category = 'Premium Elite'
    if (acrissCode[0] == 'L') category = 'Luxury'
    if (acrissCode[0] == 'W') category = 'Luxury Elite'
    if (acrissCode[0] == 'O') category = 'Oversize'
    if (acrissCode[0] == 'X') category = 'Special'

    let type = ''
    if (acrissCode[1] == 'B') type = '2-3 Door'
    if (acrissCode[1] == 'C') type = '2/4 Door'
    if (acrissCode[1] == 'D') type = '4-5 Door'
    if (acrissCode[1] == 'W') type = 'Wagon/Estate'
    if (acrissCode[1] == 'V') type = 'Passenger Van'
    if (acrissCode[1] == 'L') type = 'Limousine/Sedan'
    if (acrissCode[1] == 'S') type = 'Sport'
    if (acrissCode[1] == 'T') type = 'Convertible'
    if (acrissCode[1] == 'F') type = 'SUV'
    if (acrissCode[1] == 'J') type = 'Open Air All Terrain'
    if (acrissCode[1] == 'X') type = 'Special'
    if (acrissCode[1] == 'P') type = 'Pick up (single/extended cab) 2 door'
    if (acrissCode[1] == 'Q') type = 'Pick up (double cab) 4 door'
    if (acrissCode[1] == 'Z') type = 'Special Offer Car'
    if (acrissCode[1] == 'E') type = 'Coupe'
    if (acrissCode[1] == 'M') type = 'Monospace'
    if (acrissCode[1] == 'R') type = 'Recreational Vehicle'
    if (acrissCode[1] == 'H') type = 'Motor Home'
    if (acrissCode[1] == 'Y') type = '2 Wheel Vehicle'
    if (acrissCode[1] == 'N') type = 'Roadster'
    if (acrissCode[1] == 'G') type = 'Crossover'
    if (acrissCode[1] == 'K') type = 'Commercial Van/Truck'

    return `${category} ${type}`

}