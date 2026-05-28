// Race-results outcome layer, keyed by car id from data/cars.ts.
//
// Semantics: titles apply to the chassis lifetime (i.e. the Lotus 25 entry's
// year is 1962 but it won the 1963 WDC/WCC, so wonDrivers=wonConstructors=true).
// The WCC didn't exist until 1958 — wonConstructors is undefined for earlier cars.
// `wins` is only populated where the chassis had a notable, well-documented total;
// most entries omit it.

export type Result = {
  wonDrivers?: boolean;
  wonConstructors?: boolean;
  wins?: number;
};

export const carResults: Record<string, Result> = {
  "mercedes-w196-1955": { wonDrivers: true }, // Fangio 1954, 1955
  "lancia-d50-1955": {}, // Ascari's death; cars passed to Ferrari

  "ferrari-156-sharknose-1961": { wonDrivers: true, wonConstructors: true }, // Hill 1961
  "lotus-25-1962": { wonDrivers: true, wonConstructors: true }, // Clark 1963

  "lotus-49-1967": { wonDrivers: true, wonConstructors: true }, // Hill 1968 with 49B
  "ferrari-312b-1970": {}, // Lotus won 1970
  "tyrrell-003-1971": { wonDrivers: true, wonConstructors: true }, // Stewart 1971
  "lotus-72e-1972": { wonDrivers: true, wonConstructors: true }, // 1970 (Rindt), 1972 (Fittipaldi), 1973 WCC
  "brabham-bt44b-1975": {},
  "ferrari-312t-1975": { wonDrivers: true, wonConstructors: true }, // Lauda 1975, 1977
  "mclaren-m23-1976": { wonDrivers: true, wonConstructors: true }, // Fittipaldi 1974, Hunt 1976
  "tyrrell-p34-1976": {},
  "lotus-79-1978": { wonDrivers: true, wonConstructors: true }, // Andretti 1978
  "brabham-bt46b-1978": { wins: 1 }, // Anderstorp only, then withdrawn
  "williams-fw07-1979": { wonDrivers: true, wonConstructors: true }, // Jones 1980 with FW07B
  "renault-re30b-1982": {},

  "mclaren-mp4-2-1984": { wonDrivers: true, wonConstructors: true }, // Lauda 1984, Prost 1985, 1986 partial
  "mclaren-mp4-4-1988": { wonDrivers: true, wonConstructors: true, wins: 15 }, // Senna 1988, 15 of 16
  "mclaren-mp4-5-1989": { wonDrivers: true, wonConstructors: true }, // Prost 1989
  "ferrari-641-1990": {},
  "williams-fw14b-1992": { wonDrivers: true, wonConstructors: true }, // Mansell 1992
  "williams-fw16-1994": { wonConstructors: true }, // Williams 1994 (Schumi WDC at Benetton)
  "ferrari-412-t2-1995": {},

  "williams-fw18-1996": { wonDrivers: true, wonConstructors: true }, // Hill 1996
  "ferrari-f310-1996": {},
  "mclaren-mp4-13-1998": { wonDrivers: true, wonConstructors: true }, // Häkkinen 1998
  "ferrari-f1-2000": { wonDrivers: true, wonConstructors: true }, // Schumacher 2000
  "ferrari-f2002": { wonDrivers: true, wonConstructors: true, wins: 15 }, // Schumacher 2002, 15 of 17
  "ferrari-f2004-2004": { wonDrivers: true, wonConstructors: true }, // Schumacher 2004
  "renault-r25-2005": { wonDrivers: true, wonConstructors: true }, // Alonso 2005
  "ferrari-248-f1-2006": {},
  "mclaren-mp4-23-2008": { wonDrivers: true }, // Hamilton 2008, Ferrari WCC
  "ferrari-f2008": { wonConstructors: true }, // Ferrari WCC, Hamilton WDC

  "brawn-bgp001-2009": { wonDrivers: true, wonConstructors: true, wins: 8 }, // Button 2009
  "redbull-rb6-2010": { wonDrivers: true, wonConstructors: true }, // Vettel 2010
  "mclaren-mp4-27-2012": {},
  "mercedes-w04-2013": {},
  "redbull-rb9-2013": { wonDrivers: true, wonConstructors: true }, // Vettel 2013

  "mercedes-w05-2014": { wonDrivers: true, wonConstructors: true }, // Hamilton 2014
  "ferrari-f14-t-2014": {},
  "mercedes-w08-2017": { wonDrivers: true, wonConstructors: true }, // Hamilton 2017
  "mercedes-w09-2018": { wonDrivers: true, wonConstructors: true }, // Hamilton 2018
  "mercedes-w11-2020": { wonDrivers: true, wonConstructors: true }, // Hamilton 2020
  "mercedes-w12-2021": { wonConstructors: true }, // Mercedes 8th straight WCC
  "redbull-rb16b-2021": { wonDrivers: true }, // Verstappen 2021

  "redbull-rb18-2022": { wonDrivers: true, wonConstructors: true }, // Verstappen 2022
  "redbull-rb19-2023": { wonDrivers: true, wonConstructors: true, wins: 21 }, // Verstappen 2023, 21 of 22
  "mercedes-w14-2023": {},
  "ferrari-sf-23": {},
  "mclaren-mcl38-2024": { wonConstructors: true }, // McLaren 2024 WCC, Verstappen WDC with RB20
};

export function getResults(carId: string): Result {
  return carResults[carId] ?? {};
}
