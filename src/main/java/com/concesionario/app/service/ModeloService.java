package com.concesionario.app.service;

import com.concesionario.app.domain.Modelo;
import com.concesionario.app.repository.ModeloRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Modelo}.
 */
@Service
@Transactional
public class ModeloService {

    private final Logger log = LoggerFactory.getLogger(ModeloService.class);

    private final ModeloRepository modeloRepository;

    public ModeloService(ModeloRepository modeloRepository) {
        this.modeloRepository = modeloRepository;
    }

    /**
     * Save a modelo.
     *
     * @param modelo the entity to save.
     * @return the persisted entity.
     */
    public Modelo save(Modelo modelo) {
        log.debug("Request to save Modelo : {}", modelo);
        return modeloRepository.save(modelo);
    }

    /**
     * Partially update a modelo.
     *
     * @param modelo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Modelo> partialUpdate(Modelo modelo) {
        log.debug("Request to partially update Modelo : {}", modelo);

        return modeloRepository
            .findById(modelo.getId())
            .map(existingModelo -> {
                if (modelo.getModelo() != null) {
                    existingModelo.setModelo(modelo.getModelo());
                }

                return existingModelo;
            })
            .map(modeloRepository::save);
    }

    /**
     * Get all the modelos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Modelo> findAll(Pageable pageable) {
        log.debug("Request to get all Modelos");
        return modeloRepository.findAll(pageable);
    }

    /**
     * Get all the modelos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Modelo> findAllWithEagerRelationships(Pageable pageable) {
        return modeloRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one modelo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Modelo> findOne(Long id) {
        log.debug("Request to get Modelo : {}", id);
        return modeloRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the modelo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Modelo : {}", id);
        modeloRepository.deleteById(id);
    }
}
