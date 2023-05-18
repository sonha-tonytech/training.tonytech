--1. dat ten context khong dung.

--2. tach context ra nhieu context, moi context xu ly data noi bo.
--3. tao function util: getDataInLocalStorage('userLogin', null)
4. nguyen tac khi su dung data o cac components:
- cac components ma nam trong folder components:
    + khong duoc tuong tac voi context
    + khong duoc goi API trong do
    + chi nhan data tu props truyen xuong va truyen len

- duoc phep dung context, va goi API o cac loai components:
    + components duoc dat trong folder pages, layouts, modules

5. tach nho routers:
    + home /
    + chat/:id

6. co gang xai chung components cho cac phan tu hay lap lai
7. dung nodejs express mongodb viet api cho bai toan
8. hoc socket-io lam reamtime chat.