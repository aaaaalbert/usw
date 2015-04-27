% apfelbaumspiel.m --- berechne einige Eigenschaften der absorbierenden 
% Markovkette,, die durch das "Apfelbaumspiel" beschrieben wird.
%
% Regeln: 10 Aepfel haengen initial am Baum. Jede Runde wird eine 
% von sieben Aktionen ermittelt, die auf die Restmenge der Aepfel 
% anzuwenden ist:
% * Reduktion um 4, 3, 2 oder 1 Apfel
% * Aufstockung um 2 Aepfel
% * Ruecksetzen auf 10 Aepfel
% * keine Aenderung ("Aussetzen").
% Erreicht der Apfelstand null, ist das Spiel vorbei.
%
% Wie lange dauert das? Wie oft sehen wir welche Restmenge?
% Die absorbierende Markovkette hilft uns, das auszurechnen.
% Wir haben zehn transiente und einen absorbierenden Zustand.

% Wahrscheinlichkeiten der Uebergangszustaende
Q = 1/7 *[
3 1 1 1 1 0 0 0 0 0;
2 1 1 1 1 1 0 0 0 0;
2 0 1 1 1 1 1 0 0 0;
1 1 0 1 1 1 1 1 0 0;
1 0 1 0 1 1 1 1 1 0;
1 0 0 1 0 1 1 1 1 1;
1 0 0 0 1 0 1 1 1 1;
1 0 0 0 0 1 0 1 1 1;
1 0 0 0 0 0 1 0 1 1;
1 0 0 0 0 0 0 1 0 1;
];

% N(i,j) ist der Erwartungswert der Haeufigkeit in Zustand j zu 
% landen, wenn man in Zustand i begonnen hat
N = inv(eye(size(Q))-Q);

% Erwartungswert der Zeit bis zur Absorption
% nach Start in Zustand i
% auch: sum(N')'
t = N * ones(size(N,1),1);


% Ergebnisse:
% (davon bei obigen Regeln relevant: t(0) sowie N(1,:))
%
% output_precision(3)
% t'
% ans =
% 
%   13.28  12.71  12.01  11.16  10.24   9.29   7.83   6.58   5.43   4.48
% 
% 
% N =
% 
%   4.477  0.955  1.148  1.254  1.459  0.946  0.917  0.858  0.697  0.570
%   3.132  1.887  1.063  1.190  1.361  1.058  0.894  0.848  0.694  0.582
%   2.933  0.671  1.981  1.093  1.280  0.974  1.001  0.821  0.679  0.579
%   2.530  0.754  0.740  1.992  1.154  0.928  0.911  0.926  0.653  0.570
%   2.312  0.509  0.810  0.742  2.039  0.823  0.862  0.835  0.760  0.547
%   2.065  0.478  0.553  0.805  0.777  1.734  0.757  0.789  0.676  0.659
%   1.739  0.375  0.484  0.512  0.792  0.471  1.642  0.663  0.595  0.562
%   1.455  0.317  0.378  0.447  0.498  0.534  0.393  1.562  0.498  0.498
%   1.201  0.257  0.315  0.342  0.429  0.277  0.463  0.321  1.415  0.413
%   0.989  0.212  0.254  0.284  0.326  0.247  0.218  0.403  0.199  1.345
% 
