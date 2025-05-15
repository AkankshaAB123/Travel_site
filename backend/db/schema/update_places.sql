-- First, clear the existing data
TRUNCATE TABLE places;

-- Insert the new data
INSERT INTO `places` (`pid`, `pname`, `pcity`) VALUES
(1, 'Hyderabad', 'Telangana'),
(2, 'Allepey', 'Kerela'),
(3, 'Ooty', 'TamilNadu'),
(4, 'Panaji', 'Goa'),
(5, 'Mysore', 'Karnataka'),
(6, 'Ladakh', 'Ladakh India'); 