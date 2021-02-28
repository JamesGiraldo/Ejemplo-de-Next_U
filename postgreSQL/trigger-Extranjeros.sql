
CREATE DEFINER=root@localhost TRIGGER visitantes_AFTER_INSERT AFTER INSERT ON visitantes FOR EACH ROW BEGIN
if (New.extranjero > 0) then
update resumen set total_extranjeros = total_extranjeros + 1 where id =1 ;
else
update resumen set total_locales = total_locales + 1 where id = 1 ;
end if ;
END
