PGDMP     ;                     {            webstats     14.6 (Ubuntu 14.6-1.pgdg20.04+1)     15.1 (Ubuntu 15.1-1.pgdg20.04+1)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    73728    webstats    DATABASE     p   CREATE DATABASE webstats WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE webstats;
                postgres    false                      0    205785 	   Character 
   TABLE DATA           ~   COPY public."Character" (id, name, age, picture, level, "maxLife", life, "maxSanity", sanity, "maxWeight", notes) FROM stdin;
    public          postgres    false    211   _                 0    205826    Ability 
   TABLE DATA           C   COPY public."Ability" (id, name, "characterId", level) FROM stdin;
    public          postgres    false    221   h                 0    205794 	   Attribute 
   TABLE DATA           4   COPY public."Attribute" (id, name, tag) FROM stdin;
    public          postgres    false    213   �                 0    205812    CharacterAttribute 
   TABLE DATA           W   COPY public."CharacterAttribute" (id, level, "characterId", "attributeId") FROM stdin;
    public          postgres    false    217   .       
          0    205803    Skill 
   TABLE DATA           :   COPY public."Skill" (id, name, "attributeId") FROM stdin;
    public          postgres    false    215   v                 0    205819    CharacterSkill 
   TABLE DATA           O   COPY public."CharacterSkill" (id, level, "characterId", "skillId") FROM stdin;
    public          postgres    false    219   �                 0    205835    Item 
   TABLE DATA           K   COPY public."Item" (id, name, weight, quantity, "characterId") FROM stdin;
    public          postgres    false    223   :                 0    205775    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    209   \                  0    0    Ability_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Ability_id_seq"', 28, true);
          public          postgres    false    220                       0    0    Attribute_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Attribute_id_seq"', 6, true);
          public          postgres    false    212                       0    0    CharacterAttribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."CharacterAttribute_id_seq"', 11, true);
          public          postgres    false    216                       0    0    CharacterSkill_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."CharacterSkill_id_seq"', 77, true);
          public          postgres    false    218                       0    0    Character_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Character_id_seq"', 3, true);
          public          postgres    false    210                       0    0    Item_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Item_id_seq"', 27, true);
          public          postgres    false    222                       0    0    Skill_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Skill_id_seq"', 30, true);
          public          postgres    false    214               �   x���AN�0EדS��g�g�V,�l�شQ'���>M$H�4�,<i�=�o�R*8�ú��;cƒ�����OKN��ղ����?���g#�-�W��ZOL�z�(J���h^��.el3Jn�m���,Q�����n�{ �~!�w`��t:M@�����Ӫ��_V��EO���7+a���c�HWv��:���b�!8K�<�e.��a�^mV�~˟,�F"�� fӾ|��mw��i���n�         B   x�3�(��M�,�/V�O�/28�9��9�2�RAc.#ΐ�ļ��ҒĔ�"NC��=... f��         d   x����@D��L� )	�.�1�Ҳ���DK�C{�O�-�hl| lN��/b���Gޞ|��n��kvTS���,B�������%_�#�K;��a"F         8   x���	 0���0�$=w��s45��y�3�Â)&K��o��.�'.:!�e;	      
   "  x�U��m�0E�������Iv酖��%�,t��P��n��J�I����>�Oj(<�Z�<S��P��g����6�-�P)�
����R�p��>u�y�p�1	���̅GI��Y�DBA���)�Y̭�0%�s�`���~�8�-��2��%�Xb�܀��^ҁ�|"؃�J�w�Ai�F�׈N�%��ۅϰP��<ӈ�P�<�S���^q��2�Nȫe ݔ���Pzx%n^�ze:Y�q��
�@���3k<vr��t��'r$�LBYXvm(��Ƚz{UJ��2�         �   x�%�� C��.홠��t�9�p~�.��c4�p�snp�p@p�*O�":8�]�jJw'��{_���e	�,��pCj:�w�B��̭�r�vS���#"^K>��� �G��Xe���E�}*~���[�"           x�]�MN�0��/��e+�;u~�4HP�l�-��1%R��V���c��,������,���Il�����5�鮨��3�hf�<)4L.R�*P4Iz�wS�q9���A��/n�ѴL���`��YPX���6СWXكk֓�Ϡ���FJK���:V!)V�uT[�s_�֞"���n7f��}�m�0ubּߨ���3�Qq-��md��{~gRˋ��\��k�I��7OÍ���
1���q���9t��G��P���ݳ��kE�?,�]�         �  x���[j�G���Ux�S���"f��b�@v����I��#z�����N���|p�꣈��h�eK��Ň>`l�s�)4Fp��{s��cU���� ��ֺ*О����� �'���p �Z��_B"�/`<���y�%z��������/���X/�?]??Ҫ�䪅�ކ��(���.�i������У�2�^A�SQ�7T^ĭ�J�shG�u���?&BV�7"�#�H�9�<?��������˟?�q��z���yBa�R������ރ\L�~�6�Bl�fu�l�a����#���|�>��uHKf��`���i�^��+�\;�=_�����O'�XM��ȌWۥKxi��&*��;�@�~��A{��`'�Z%��g�]�L���5a�9���[�B3�ë��e�݅Ȅ��ڻ�H��}���7݁��d�Yi+v�l��SGa��|��I�I�0U��2�i���mO��܇�#�"����Sc��d�;��條 #�V�d0���G7كKz�E��\�\�����.�II*�אP�Y�N���ꑩ��M�<�¢��Yn�;��r5�O�n.�	۫:�3��?Zx�˃��s�.S���%�ral�0�3����κ������M��������x||����     