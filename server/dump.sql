PGDMP          1                 {         )   webstats-server-main-db-0a54e6beda0107b92    14.3     15.1 (Ubuntu 15.1-1.pgdg20.04+1)     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    38124 )   webstats-server-main-db-0a54e6beda0107b92    DATABASE     �   CREATE DATABASE "webstats-server-main-db-0a54e6beda0107b92" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
 ;   DROP DATABASE "webstats-server-main-db-0a54e6beda0107b92";
                adaptableadmin    false            �          0    38137 	   Character 
   TABLE DATA           ~   COPY public."Character" (id, name, age, picture, level, "maxLife", life, "maxSanity", sanity, "maxWeight", notes) FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    211   �       �          0    38178    Ability 
   TABLE DATA           <   COPY public."Ability" (id, name, "characterId") FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    221   �       �          0    38146 	   Attribute 
   TABLE DATA           4   COPY public."Attribute" (id, name, tag) FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    213   	       �          0    38164    CharacterAttribute 
   TABLE DATA           W   COPY public."CharacterAttribute" (id, level, "characterId", "attributeId") FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    217   }       �          0    38155    Skill 
   TABLE DATA           :   COPY public."Skill" (id, name, "attributeId") FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    215   �       �          0    38171    CharacterSkill 
   TABLE DATA           O   COPY public."CharacterSkill" (id, level, "characterId", "skillId") FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    219   �       �          0    38187    Item 
   TABLE DATA           K   COPY public."Item" (id, name, weight, quantity, "characterId") FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    223   ~       �          0    38127    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public       )   webstats-server-main-db-0a54e6beda0107b92    false    209   �       �           0    0    Ability_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Ability_id_seq"', 3, true);
          public       )   webstats-server-main-db-0a54e6beda0107b92    false    220            �           0    0    Attribute_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Attribute_id_seq"', 6, true);
          public       )   webstats-server-main-db-0a54e6beda0107b92    false    212            �           0    0    CharacterAttribute_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."CharacterAttribute_id_seq"', 9, true);
          public       )   webstats-server-main-db-0a54e6beda0107b92    false    216            �           0    0    CharacterSkill_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."CharacterSkill_id_seq"', 27, true);
          public       )   webstats-server-main-db-0a54e6beda0107b92    false    218            �           0    0    Character_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Character_id_seq"', 3, true);
          public       )   webstats-server-main-db-0a54e6beda0107b92    false    210            �           0    0    Item_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Item_id_seq"', 19, true);
          public       )   webstats-server-main-db-0a54e6beda0107b92    false    222            �           0    0    Skill_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Skill_id_seq"', 29, true);
          public       )   webstats-server-main-db-0a54e6beda0107b92    false    214            �   �   x���MR�0�r�^ �$˖�V,�l<�i3m�����I�ϰ���zZ|OOCw��ۥ�
Vమ��Θ��!uy8�Ӓ�<w��&�k�c��٨:���8��H��S�Hz�^"�W�٦�mFͭ� %��1d��֤n�{ `w!����cZ����^��^�ȫRt��j�>�N�o�G
ѫƴ/_�E`��=0Ac�~�N�	H�>��l?��NU02Y+$���R�u��v�!�p�_��i> ��n�      �   @   x�3�)J�+�--IL�/�4�2�(��M�,�/V�O�/28���9�t�2�RA�=... HTd      �   d   x����@D��L� )	�.�1�Ҳ���DK�C{�O�-�hl| lN��/b���Gޞ|��n��kvTS���,B�������%_�#�K;��a"F      �   8   x�3�4A.#0m�e���L��	�)H(n���������g	RT���� a	      �     x�U��m�0E�������Iv酑��%�lt��P��n���')z���$?ii�>&��".��>�j�,?���{O�R<�S5��9ɬ��6��$�|-��*s�a��8�t�R�Y;�|"�"H�;5�8�\k�s��*�<j�9u�oM�>1�o�X)Ef/a+i�%���b���Ͱ7�D˔x�#��I7;�D�$'�C�v0̒����,yvW��1U�N(S�0@nJ�Oy%?��[�{��Tu�m�������?�a���{JG4O܋_q1��0v}{5���ݗk      �   ~   x�%��0ߨ�d,᳗�_G8�I`��<�)���;�%m��/v��}*yq��ȋ�"�Q�Y��<=Ћ��lw��)�\��X�Ď[@�%h���z�qCj��w�A��ȭ��r���˟��}��, �      �     x�]��N�0���S���P�:q~JH�N
�]K���)����<t/�:?W�~3cϬ���e$@��A��m;3Q(c������)����mq�PZ�I���rPw*�_�(�z�T�Re��bG�������q�>��ٞ�놄��a0]�
'������h&�L�	u�.�� %kkM Coe��6Vh#�0�����Z�3��s���.,���7�um�`���9n��1�ቜ�7Xm���ʫn�w%�_��7R�Kr6��A�|`aU      �   �   x���Kj�@D��)�#�3�"'0���,"�K�x�eEm
�L-��8xRE�E����Z0W�PE>�#��l�̤���d �^��g)Jȭf����;�Dp")P� _	�,T�D ���Q��n}_]w5����������m�}�yg��%���ٓ��>�N����*rhd�kʠ1��Q�>_�BU��F/.U"�ݖy�~k�     