INSERT INTO `booking` (`id`, `ffirst`, `flast`, `femail`, `city`, `fphone`, `fdesti`) VALUES
(1, 'Ganesh', 'Naik', 'ganeshravinaik2001@gmail.com', 'Honnavar', 2147483647, 'Goa'),
(2, 'kiran', 'Naik', 'kirannaik1@gmail.com', 'Honnavar', 845868956, 'Mumbai'),
(7, 'Ganesh', 'Naik', 'ganeshravinaik2001@gmail.com', 'Honnavar', 2147483647, 'Mysore'),
(8, 'Hitesh', 'HT', 'hitesh45jk@gmail.com', 'Udupi', 458696561, 'Kerala'),
(9, 'Ganesh', 'Naik', 'ganeshravinaik2001@gmail.com', 'Honnavar', 2147483647, 'Kerala'),
(10, 'Ganesh', 'Naik', 'ganeshravinaik2001@gmail.com', 'Honnavar', 2147483647, 'India Gate'),
(11, 'Gajanan', 'Bhat', 'gajabhat@gmail.com', 'Kumta', 2147483647, 'Mysore'),
(12, 'Ganesh', 'Naik', 'ganeshravinaik2001@gmail.com', 'Honnavar', 2147483647, 'Kerala');

INSERT INTO `customer` (`id`, `fname`, `password`, `email`, `city`, `phone`) VALUES
(34, 'admin', 'Adm12345', 'admintms@gmail.com', 'Honnavar', 8971046276),
(51, 'Ganesh', 'Gane1234', 'ganeshravinaik2001@gmail.com', 'Honnavar', 8971046276),
(72, 'Aditya', 'Adi12389', 'adityag45@gmail.com', 'Manglore', 8574968283),
(73, 'Gajanan', 'GAjju700', 'gajabhat@gmail.com', 'Kumta', 7984768581),
(74, 'Kiran', 'AJkiran1', 'kiranaj56@gmail.com', 'Honnavar', 7586949199),
(75, 'Prasad', 'Pra23444', 'prasad24@gmail.com', 'Honnavar', 7485961256),
(76, 'Mahesh', 'Mahi1233', 'maheshmm@gmail.com', 'Kumta', 9978488656),
(78, 'Nishchay', 'Nishi789', 'nishibhatt234@gmail.com', 'Udupi', 7485961236);


INSERT INTO `feedback` (`id`, `name`, `email`, `feedbk`) VALUES
(1, 'joy', 'joy123@gmail.com', 'good website'),
(2, 'amar', 'amar56@gmail.com', 'nice website'),
(3, 'adam', 'adamgray@gmail.com', 'your website looks good and nice user interface'),
(4, 'adam', 'adamgray@gmail.com', 'your website looks good and nice user interface'),
(5, 'arjun', 'arjun45@gmal.com', 'good website'),
(6, 'Hitesh', 'hitesh43jk@gmai.com', 'its good website nice user interface'),
(7, 'kiran', 'kiran35@gmail.com', 'this is a good website');

INSERT INTO `hotels` (`hid`, `hname`, `hphone`, `hcity`) VALUES
(1, 'Taj Hotel', '78869565', 'Mumbai'),
(2, 'Hotel High', '78869565', 'Benglore');

INSERT INTO `information` (`pname`, `pdescription`, `pi_main`, `pi1`, `pi2`, `pi3`, `package`) VALUES
('Goa', 'Calangute is the most popular holiday destination in Goa. Calangute Beach is colloquially know as the Queen of all the Beaches. Excellent accommodation facilites are available, particularly at the tourist resorts and cottages.\r\nThe Beaches of Goa are much ahead of other beaches in India in terms of popularity and the facilities that are available here. The beaches here have been accepted as a matter of life, there are exotic cuisine backing the pleasure of have on sun and sand, and water sports facilities that include from water scooters to water gliding. To add on you can shake your legs for some time with a glass of feni and beer, engaged in shopping on the beachside, or have midnight bonfire on the beach.', 'images//destination//goa1.jpg', 'images//destination//goa2.jpg', 'images//destination//goa3.jpg', 'images//destination//goa4.jpg', 15000),
('Kerala', 'A state in Southern India is known as a tropical paradise of waving palms and wide sandy beaches. It is a narrow strip of coastal territory that slopes down the Western Ghats in a cascade of lush green vegetation, and reaches to the Arabian sea. Kerala borders the states of Tamil Nadu to the east and Karnataka to the north. It is also known for its backwaters, mountains, coconuts, spices and art forms like Kathakali and Mohini Attam. It is the most literate state in India, and a land of diverse religions, where you can find Hindu temples, mosques, churches, and even synagogues. With world class tourist sporting options, ayurvedic spas and treatments, eco-tourism initiatives, Kerala has much to offer the visitor.', 'images//destination//kerala1.jpg', 'images//destination//kerala2.jpg', 'images//destination//kerala3.jpg', 'images//destination//kerala4.jpg', 10000),
('Mysore', 'Mysore Palace, also called Amba Vilas Palace, is one of the most magnificent and largest palaces in India. Situated in the southern state of Karnataka, it used to be the official residence of the Wodeyar Dynasty, the rulers of Mysore from 1399 to 1950. The grand palace stands tall in the heart of Mysore city and attracts visitors from across the world. Being one of the prime attractions in India after the Taj Mahal, it certainly deserves a place in every traveler’s bucket list. So why not visit Mysore Palace this holiday season?', 'images//destination//mysore1.jpg', 'images//destination//mysore2.jpg', 'images//destination//mysore3.jpg', 'images//destination//mysore4.jpg', 9000),
('Ladakh', 'Leh & Ladakh, situated amidst the Great Himalayas and the Karakoram ranges in the scenic state of Jammu and Kashmir, are two of the most spectacular places in the world where scores of tourists from across the globe throng annually. Emblems of pure paradisiacal beauty, Leh & Ladakh are all about awe-inspiring landscapes, picturesque green oasis, scintillating monasteries and quaint hamlets. You are taken in by the breathtaking beauty the moment you land in this incredible mountain town. Get mesmerised by the amazingly pristine blue sky and transfer to a world of complete solitude admiring the mountain flowers, the snow covered peaks, the streams flowing by and the deep valleys', 'images//destination//ladakh1.jpg', 'images//destination//ladakh2.jpg', 'images//destination//ladakh3.jpg', 'images//destination//ladakh4.jpg', 20000),
('Taj Mahal', 'The Taj Mahal is located on the right bank of the Yamuna River in a vast Mughal garden that encompasses nearly 17 hectares, in the Agra District in Uttar Pradesh. It was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal with construction starting in 1632 AD and completed in 1648 AD, with the mosque, the guest house and the main gateway on the south, the outer courtyard and its cloisters were added subsequently and completed in 1653 AD. The existence of several historical and Quaranic inscriptions in Arabic script have facilitated setting the chronology of Taj Mahal.', 'images//destination//tajmahal1.jpg', 'images//destination//tajmahal2.jpg', 'images//destination//tajmahal3.jpg', 'images//destination//tajmahal4.jpg', 19000),
('India Gate', 'India Gate is one of many British monuments built by order of the Imperial War Graves Commission (later renamed Commonwealth War Graves Commission). The architect was Sir Edwin Lutyens, an Englishman who designed numerous other war memorials and was also the principal planner of New Delhi. The cornerstone was laid in 1921 by the duke of Connaught, third son of Queen Victoria. Construction of the All-India War Memorial, as it was originally known, continued until 1931, the year of the formal dedication of New Delhi as the capital of India.', 'images//destination//india_gate1.jpg', 'images//destination//india_gate2.jpg', 'images//destination//india_gate3.jpg', 'images//destination//india_gate4.jpg', 10000),
('Hampi', 'Hampi is one of finest historical sites of ancient age in the world. It was the initial capital city of famous historical Vijayanagara Empire located on the bank of Tungabhadra River about 11 km away from Hospet City. Hampi is a small location covered an area of 25 sq. km. and it is totally bounded by mountains (Anjaneya, Malyavanta and Matanga Hills) by the three sites and rest one site is bordered by Tungabhadra River. It is believed by Hindus that Hampi was a kingdom of Monkeys (according to the Ramayana) before Vijayanagara Empire in pre-ancient age (around 1 CE) when the city was known as Kishkindha.', 'images//destination//hampi1.jpg', 'images//destination//hampi2.jpg', 'images//destination//hampi3.jpg', 'images//destination//hampi4.jpg', 5000),
('Rajasthan', 'Rajasthan, state of northwestern India, located in the northwestern part of the Indian subcontinent. It is bounded to the north and northeast by the states of Punjab and Haryana, to the east and southeast by the states of Uttar Pradesh and Madhya Pradesh, to the southwest by the state of Gujarat, and to the west and northwest by the provinces of Sindh and Punjab in Pakistan. The capital city is Jaipur, in the east-central part of the state.', 'images//destination//rajasthan1.jpg', 'images//destination//rajasthan2.jpg', 'images//destination//rajasthan3.jpg', 'images//destination//rajasthan4.jpg', 16000),
('Manali', 'Once called the \"end of the habitable world,\" Manali is an important hill station of northern India and is the destination of thousands of tourists every year. Its cool atmosphereprovides a perfect haven for the ones afflicted by the hot Indian summers. Besides offering quite a few places for sightseeing, Manali is also famous for adventure sports like skiing, hiking, mountaineering, paragliding, rafting, trekking, kayaking, and mountain biking. In brief, Manali-the veritable \"valley of the Gods\"-is an ideal place for the ones in search of both adventure and comfort.', 'images//destination//manali1.jpg', 'images//destination//manali2.jpg', 'images//destination//manali3.jpg', 'images//destination//manali4.jpg', 21000),
('Srinagar', 'Srinagar, the summer capital is situated in the centre of Kashmir valley and is surrounded by five districts. In the north it is flanked by Kargil, in the South by Pulwama, in the north-west by Budgam. This extremely beautiful place tells the story of the love of the Mughal emperors. It possess deep green rice fields and river bridges, gardens in bloom, lakes rimmed by houseboats, a business center and holiday resort.', 'images//destination//srinagar1.jpg', 'images//destination//srinagar2.jpg', 'images//destination//srinagar3.jpg', 'images//destination//srinagar4.jpg', 21200),
('Amritsar', 'Amritsar - Amritsar, literally Pool of Nectar, derives its name from Amrit Sarovar, the holy tank that surrounds the fabulous Golden Temple. First time visitors to Amritsar could be forgiven for the impression that Amritsar is like any other small town in northern India. In one sense, it is - with bustling markets, haphazard traffic, unyielding cattle, crowds and congestion typical of small town India. But Amritsar stands head and shoulders above any other city, its status elevated and sanctified by the presence of the venerable Golden Temple.', 'images//destination//amritsar1.jpg', 'images//destination//amritsar2.jpg', 'images//destination//amritsar3.jpg', 'images//destination//amritsar4.jpg', 19000),
('Jog Falls', 'Jog Falls are located in the Shimoga district of Karnataka. Four cascades, known as Raja, Rani, Rover and Rocket merge to form the huge waterfall on the Sharavathi River. The falls are locally known as Geruoppe Falls, Gersoppa Falls and Jogada Gundi. Jog itself is a Kannada word, which means falls. Jog Falls are unique as the water does not stream down the rocks in a tiered fashion; it thunders down the slope losing contact with the rocks, making it the tallest un-tiered waterfall in India. The beauty of the waterfalls is enhanced by the lush green surroundings, which provide a scenic backdrop. Visitors can hike to the base of the falls and take a plunge in the water.', 'images//destination//jogfalls1.jpg', 'images//destination//jogfalls2.jpg', 'images//destination//jogfalls3.jpg', 'images//destination//jogfalls4.jpg', 5000),
('Manglore', 'Manglore', 'images//destination//mysore1.jpg', 'images//destination//mysore2.jpg', 'images//destination//kerala3.jpg', 'images//destination//srinagar4.jpg', 0);

INSERT INTO `login` (`user`, `pass`, `date_time`) VALUES
('adii', '784596', '2021-01-20 05:56:33am'),
('anusha', '45789656', '2021-01-20 06:06:24am'),
('adii', '123456', '2021-01-20 08:15:18am'),
('gaja', '12356', '2021-01-22 10:13:22am'),
('gaja', '123456', '2021-01-24 06:40:56am'),
('nishchay', 'nishi123', '2021-01-24 07:09:22am'),
('mahesh', '12345mn', '2021-01-24 07:10:00am'),
('admin', 'ad123', '2021-01-24 07:10:24am'),
('admin', 'ad123', '2021-01-25 05:54:18am'),
('admin', 'ad123', '2021-01-25 06:07:10am'),
('admin', 'ad123', '2021-01-25 06:09:19am'),
('admin', 'ad123', '2021-01-27 01:30:47pm'),
('admin', 'ad123', '2021-01-29 09:23:58am'),
('Gajanan', 'GAjju700', '2021-01-30 06:13:16pm'),
('Ganesh', 'Gane1234', '2021-01-30 06:24:15pm'),
('admin', 'ad123', '2021-06-08 04:11:53pm'),
('admin', 'ad123', '2021-09-19 03:24:26pm'),
('admin', 'ad123', '2021-09-19 04:41:06pm');

INSERT INTO `payments` (`id`, `booking_id`, `payment_method`, `amount`, `payment_status`, `transaction_id`, `created_at`) VALUES
(25, 1, 'Credit Card', 150.00, 'completed', 'TXN1001', '2025-04-30 16:35:33'),
(26, 2, 'PayPal', 200.00, 'completed', 'TXN1002', '2025-04-30 16:35:33'),
(27, 7, 'Debit Card', 250.00, 'pending', 'TXN1003', '2025-04-30 16:35:33'),
(28, 8, 'Credit Card', 100.00, 'failed', 'TXN1004', '2025-04-30 16:35:33'),
(29, 9, 'Credit Card', 150.00, 'completed', 'TXN1005', '2025-04-30 16:35:33'),
(30, 10, 'PayPal', 180.00, 'completed', 'TXN1006', '2025-04-30 16:35:33'),
(31, 11, 'Debit Card', 220.00, 'completed', 'TXN1007', '2025-04-30 16:35:33'),
(32, 12, 'Credit Card', 210.00, 'pending', 'TXN1008', '2025-04-30 16:35:33');

INSERT INTO `places` (`pid`, `pname`, `pcity`) VALUES
(1, 'Tajmahal', 'Agra'),
(2, 'Beach', 'Goa'),
(3, 'India Gate', 'Delhi'),
(4, 'Kerala Beach', 'Kerala'),
(5, 'Mysore Palace', 'Mysore'),
(6, 'Ladakh', 'Ladakh India');

INSERT INTO `travel_agent` (`aid`, `afname`, `aemail`, `aphone`, `acity`) VALUES
(1, 'amar', 'amarraj123@gmail.com', 85749646, 'Mandya'),
(2, 'akhil', 'akhil23@gmai.com', 45968678, 'Manglore'),
(3, 'kiran', 'kiru34@gmail.com', 78969665, 'Mysore');

INSERT INTO `users` (`username`, `email`, `password`, `created_at`) VALUES
('arjun', 'arjun.kumar@example.com', 'Arjun@123', '2025-04-30 09:38:06'),
('priya', 'priya.sharma@example.com', 'Priya#456', '2025-04-30 09:38:06'),
('rahul', 'rahul.verma@example.com', 'Rahul$789', '2025-04-30 09:38:06'),
('ananya', 'ananya.singh@example.com', 'Ananya*321', '2025-04-30 09:38:06'),
('vikram', 'vikram.mehra@example.com', 'Vikram@007', '2025-04-30 09:38:06');

