package com.exampleElecti.Electi.repository;

import com.exampleElecti.Electi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
* @Author: Cervantes Juan
* @Date: 1/10/2025
* */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {//Repository of the user

    Optional<User> findById(Long id);//Finding by the user id
    Optional<User> findByEmail(String email);

}
